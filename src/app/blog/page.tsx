
import ContentLayout from "@/components/layout/ContentLayout"

export default function BlogPage() {
  return (
    <ContentLayout 
      title="Blog"
      breadcrumbs={[{ label: "Blog" }]}
    >
      <div className="space-y-8">
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-text-secondary">
            The blog is under development. Check back soon!
          </p>
        </div>
      </div>
    </ContentLayout>
  )
}
