
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  team_size: string;
  location: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    
    // Send notification to admin
    const adminEmailResponse = await resend.emails.send({
      from: "PamirHub <onboarding@resend.dev>",
      to: [ADMIN_EMAIL!],
      subject: "New Contact Form Submission",
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${formData.first_name} ${formData.last_name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Company Size:</strong> ${formData.team_size}</p>
        <p><strong>Location:</strong> ${formData.location}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
      `,
    });

    // Send confirmation to user
    const userEmailResponse = await resend.emails.send({
      from: "PamirHub <onboarding@resend.dev>",
      to: [formData.email],
      subject: "We've received your message!",
      html: `
        <h1>Thank you for contacting PamirHub!</h1>
        <p>Dear ${formData.first_name},</p>
        <p>We have received your message and will get back to you within 24 hours.</p>
        <p>Here's a copy of your message:</p>
        <blockquote>${formData.message}</blockquote>
        <p>Best regards,<br>The PamirHub Team</p>
      `,
    });

    console.log("Emails sent successfully:", { adminEmailResponse, userEmailResponse });

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error sending emails:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
