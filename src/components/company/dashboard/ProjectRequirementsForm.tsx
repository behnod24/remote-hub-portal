
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ProjectRequirement } from '@/types/company'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/components/ui/use-toast'

interface ProjectRequirementsFormProps {
  projectId: string
  onSubmit: (requirement: ProjectRequirement) => void
}

export default function ProjectRequirementsForm({
  projectId,
  onSubmit
}: ProjectRequirementsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      required_skills: '',
      priority: 'medium',
    },
  })

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true)
    try {
      const requirement = {
        project_id: projectId,
        title: values.title,
        description: values.description,
        required_skills: values.required_skills.split(',').map((s: string) => s.trim()),
        priority: values.priority,
        status: 'open',
      }

      const { data, error } = await supabase
        .from('project_requirements')
        .insert([requirement])
        .select()
        .single()

      if (error) throw error

      onSubmit(data)
      form.reset()
      toast({
        title: 'Success',
        description: 'Project requirement added successfully',
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to add requirement. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter requirement title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter requirement description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="required_skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required Skills (comma-separated)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="React, TypeScript, Node.js" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Adding...' : 'Add Requirement'}
        </Button>
      </form>
    </Form>
  )
}
