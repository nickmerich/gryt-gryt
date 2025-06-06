export interface EmailTemplate {
  id: string
  name: string
  subject: string
  htmlContent: string
  textContent: string
  variables: string[]
}

export interface EmailNotification {
  id: string
  userId: string
  email: string
  templateId: string
  subject: string
  content: string
  variables: Record<string, string>
  scheduledFor: string
  sentAt?: string
  status: "pending" | "sent" | "failed" | "cancelled"
  retryCount: number
  errorMessage?: string
  createdAt: string
  updatedAt: string
}

export interface EmailPreferences {
  userId: string
  email: string
  isVerified: boolean
  unsubscribeToken: string
  preferences: {
    habitReminders: boolean
    dailyReflection: boolean
    weeklyReview: boolean
    achievementAlerts: boolean
    contractReminders: boolean
    marketingEmails: boolean
  }
  frequency: "immediate" | "daily_digest" | "weekly_digest"
  timezone: string
  createdAt: string
  updatedAt: string
}

// Email templates
export const emailTemplates: Record<string, EmailTemplate> = {
  habitReminder: {
    id: "habit_reminder",
    name: "Daily Habit Reminder",
    subject: "Time to Log Your Habits - GRYT",
    variables: ["userName", "streakCount", "todayDate"],
    htmlContent: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Habit Reminder - GRYT</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; }
            .header { background: linear-gradient(135deg, #10b981, #059669); padding: 40px 20px; text-align: center; }
            .logo { color: white; font-size: 32px; font-weight: 900; margin-bottom: 10px; }
            .header-text { color: white; font-size: 18px; font-weight: 600; }
            .content { padding: 40px 20px; }
            .greeting { font-size: 24px; font-weight: 700; color: #1f2937; margin-bottom: 20px; }
            .message { font-size: 16px; line-height: 1.6; color: #4b5563; margin-bottom: 30px; }
            .cta-button { display: inline-block; background-color: #10b981; color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; border: 3px solid #000; box-shadow: 4px 4px 0px 0px rgba(0,0,0,1); }
            .stats { background-color: #f0fdf4; border: 3px solid #10b981; border-radius: 12px; padding: 20px; margin: 30px 0; }
            .stat-item { display: flex; justify-content: space-between; margin-bottom: 10px; }
            .stat-label { font-weight: 600; color: #1f2937; }
            .stat-value { font-weight: 700; color: #10b981; }
            .footer { background-color: #f9fafb; padding: 30px 20px; text-align: center; border-top: 1px solid #e5e7eb; }
            .footer-text { font-size: 14px; color: #6b7280; margin-bottom: 10px; }
            .unsubscribe { font-size: 12px; color: #9ca3af; }
            .unsubscribe a { color: #9ca3af; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">GRYT</div>
              <div class="header-text">Your Daily Habit Reminder</div>
            </div>
            
            <div class="content">
              <div class="greeting">Hey {{userName}}! 👋</div>
              
              <div class="message">
                It's time to reflect on your day and log the habits that are shaping your journey toward your goals. 
                Every small action counts, and tracking them helps you stay accountable and motivated.
              </div>
              
              <div class="stats">
                <div class="stat-item">
                  <span class="stat-label">Current Streak:</span>
                  <span class="stat-value">{{streakCount}} days 🔥</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Date:</span>
                  <span class="stat-value">{{todayDate}}</span>
                </div>
              </div>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="{{dashboardUrl}}" class="cta-button">Log Your Habits</a>
              </div>
              
              <div class="message">
                <strong>Quick Reminder:</strong> Focus on both the positive habits that moved you closer to your goals 
                and any negative patterns that might have held you back. Growth comes from honest self-reflection.
              </div>
            </div>
            
            <div class="footer">
              <div class="footer-text">
                Keep building those positive habits! 💪
              </div>
              <div class="unsubscribe">
                <a href="{{unsubscribeUrl}}">Unsubscribe</a> | 
                <a href="{{preferencesUrl}}">Email Preferences</a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    textContent: `
Hey {{userName}}!

It's time to reflect on your day and log the habits that are shaping your journey toward your goals.

Current Streak: {{streakCount}} days
Date: {{todayDate}}

Log your habits: {{dashboardUrl}}

Focus on both the positive habits that moved you closer to your goals and any negative patterns that might have held you back. Growth comes from honest self-reflection.

Keep building those positive habits!

---
Unsubscribe: {{unsubscribeUrl}}
Email Preferences: {{preferencesUrl}}
    `,
  },

  weeklyReview: {
    id: "weekly_review",
    name: "Weekly Habit Review",
    subject: "Your Weekly Habit Summary - GRYT",
    variables: ["userName", "weekStart", "weekEnd", "totalHabits", "positiveHabits", "topCategory"],
    htmlContent: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Weekly Review - GRYT</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; }
            .header { background: linear-gradient(135deg, #10b981, #059669); padding: 40px 20px; text-align: center; }
            .logo { color: white; font-size: 32px; font-weight: 900; margin-bottom: 10px; }
            .header-text { color: white; font-size: 18px; font-weight: 600; }
            .content { padding: 40px 20px; }
            .greeting { font-size: 24px; font-weight: 700; color: #1f2937; margin-bottom: 20px; }
            .message { font-size: 16px; line-height: 1.6; color: #4b5563; margin-bottom: 30px; }
            .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0; }
            .stat-card { background-color: #f0fdf4; border: 3px solid #10b981; border-radius: 12px; padding: 20px; text-align: center; }
            .stat-number { font-size: 32px; font-weight: 900; color: #10b981; margin-bottom: 5px; }
            .stat-label { font-size: 14px; font-weight: 600; color: #1f2937; }
            .cta-button { display: inline-block; background-color: #10b981; color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; border: 3px solid #000; box-shadow: 4px 4px 0px 0px rgba(0,0,0,1); }
            .footer { background-color: #f9fafb; padding: 30px 20px; text-align: center; border-top: 1px solid #e5e7eb; }
            .footer-text { font-size: 14px; color: #6b7280; margin-bottom: 10px; }
            .unsubscribe { font-size: 12px; color: #9ca3af; }
            .unsubscribe a { color: #9ca3af; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">GRYT</div>
              <div class="header-text">Your Weekly Habit Review</div>
            </div>
            
            <div class="content">
              <div class="greeting">Great week, {{userName}}! 📊</div>
              
              <div class="message">
                Here's your habit summary for {{weekStart}} - {{weekEnd}}. 
                Take a moment to celebrate your progress and identify areas for improvement.
              </div>
              
              <div class="stats-grid">
                <div class="stat-card">
                  <div class="stat-number">{{totalHabits}}</div>
                  <div class="stat-label">Total Habits Logged</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number">{{positiveHabits}}</div>
                  <div class="stat-label">Positive Habits</div>
                </div>
              </div>
              
              <div class="message">
                <strong>Top Category:</strong> {{topCategory}} 🏆
              </div>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="{{analyticsUrl}}" class="cta-button">View Full Analytics</a>
              </div>
              
              <div class="message">
                Keep up the momentum! Consistency in small actions leads to extraordinary results.
              </div>
            </div>
            
            <div class="footer">
              <div class="footer-text">
                Here's to another week of growth! 🌱
              </div>
              <div class="unsubscribe">
                <a href="{{unsubscribeUrl}}">Unsubscribe</a> | 
                <a href="{{preferencesUrl}}">Email Preferences</a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    textContent: `
Great week, {{userName}}!

Here's your habit summary for {{weekStart}} - {{weekEnd}}:

Total Habits Logged: {{totalHabits}}
Positive Habits: {{positiveHabits}}
Top Category: {{topCategory}}

View Full Analytics: {{analyticsUrl}}

Keep up the momentum! Consistency in small actions leads to extraordinary results.

Here's to another week of growth!

---
Unsubscribe: {{unsubscribeUrl}}
Email Preferences: {{preferencesUrl}}
    `,
  },

  achievement: {
    id: "achievement",
    name: "Achievement Notification",
    subject: "🏆 Achievement Unlocked - GRYT",
    variables: ["userName", "achievementName", "achievementDescription", "rewardPoints"],
    htmlContent: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Achievement Unlocked - GRYT</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; }
            .header { background: linear-gradient(135deg, #f59e0b, #d97706); padding: 40px 20px; text-align: center; }
            .logo { color: white; font-size: 32px; font-weight: 900; margin-bottom: 10px; }
            .header-text { color: white; font-size: 18px; font-weight: 600; }
            .content { padding: 40px 20px; text-align: center; }
            .achievement-badge { background: linear-gradient(135deg, #fbbf24, #f59e0b); border: 4px solid #000; border-radius: 50%; width: 120px; height: 120px; margin: 0 auto 30px; display: flex; align-items: center; justify-content: center; font-size: 48px; box-shadow: 4px 4px 0px 0px rgba(0,0,0,1); }
            .achievement-title { font-size: 28px; font-weight: 900; color: #1f2937; margin-bottom: 15px; }
            .achievement-desc { font-size: 16px; line-height: 1.6; color: #4b5563; margin-bottom: 30px; }
            .reward-box { background-color: #fef3c7; border: 3px solid #f59e0b; border-radius: 12px; padding: 20px; margin: 30px 0; }
            .reward-text { font-size: 18px; font-weight: 700; color: #92400e; }
            .cta-button { display: inline-block; background-color: #10b981; color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; border: 3px solid #000; box-shadow: 4px 4px 0px 0px rgba(0,0,0,1); }
            .footer { background-color: #f9fafb; padding: 30px 20px; text-align: center; border-top: 1px solid #e5e7eb; }
            .footer-text { font-size: 14px; color: #6b7280; margin-bottom: 10px; }
            .unsubscribe { font-size: 12px; color: #9ca3af; }
            .unsubscribe a { color: #9ca3af; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">GRYT</div>
              <div class="header-text">Achievement Unlocked!</div>
            </div>
            
            <div class="content">
              <div class="achievement-badge">🏆</div>
              
              <div class="achievement-title">{{achievementName}}</div>
              
              <div class="achievement-desc">
                {{achievementDescription}}
              </div>
              
              <div class="reward-box">
                <div class="reward-text">+{{rewardPoints}} Growth Points Earned!</div>
              </div>
              
              <div style="margin: 40px 0;">
                <a href="{{dashboardUrl}}" class="cta-button">View Dashboard</a>
              </div>
              
              <div class="achievement-desc">
                Congratulations, {{userName}}! Your dedication to building positive habits is paying off. 
                Keep up the excellent work!
              </div>
            </div>
            
            <div class="footer">
              <div class="footer-text">
                You're doing amazing! Keep pushing forward! 💪
              </div>
              <div class="unsubscribe">
                <a href="{{unsubscribeUrl}}">Unsubscribe</a> | 
                <a href="{{preferencesUrl}}">Email Preferences</a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    textContent: `
🏆 ACHIEVEMENT UNLOCKED! 🏆

{{achievementName}}

{{achievementDescription}}

+{{rewardPoints}} Growth Points Earned!

Congratulations, {{userName}}! Your dedication to building positive habits is paying off. Keep up the excellent work!

View Dashboard: {{dashboardUrl}}

You're doing amazing! Keep pushing forward!

---
Unsubscribe: {{unsubscribeUrl}}
Email Preferences: {{preferencesUrl}}
    `,
  },
}

// Email service functions
export class EmailService {
  private static instance: EmailService
  private apiKey: string
  private baseUrl: string

  private constructor() {
    this.apiKey = process.env.RESEND_API_KEY || ""
    this.baseUrl = "https://api.resend.com"
  }

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  async sendEmail(notification: Omit<EmailNotification, "id" | "createdAt" | "updatedAt">): Promise<boolean> {
    try {
      const template = emailTemplates[notification.templateId]
      if (!template) {
        throw new Error(`Template ${notification.templateId} not found`)
      }

      // Replace variables in content
      let htmlContent = template.htmlContent
      let textContent = template.textContent
      let subject = template.subject

      Object.entries(notification.variables).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`
        htmlContent = htmlContent.replace(new RegExp(placeholder, "g"), value)
        textContent = textContent.replace(new RegExp(placeholder, "g"), value)
        subject = subject.replace(new RegExp(placeholder, "g"), value)
      })

      // Add common variables
      const commonVars = {
        dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
        analyticsUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/analytics`,
        unsubscribeUrl: `${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?token=${notification.variables.unsubscribeToken}`,
        preferencesUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/notifications`,
      }

      Object.entries(commonVars).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`
        htmlContent = htmlContent.replace(new RegExp(placeholder, "g"), value)
        textContent = textContent.replace(new RegExp(placeholder, "g"), value)
      })

      const response = await fetch(`${this.baseUrl}/emails`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "GRYT <noreply@gryt.app>",
          to: [notification.email],
          subject: subject,
          html: htmlContent,
          text: textContent,
        }),
      })

      if (!response.ok) {
        throw new Error(`Email API error: ${response.statusText}`)
      }

      return true
    } catch (error) {
      console.error("Failed to send email:", error)
      return false
    }
  }

  async sendBulkEmails(notifications: Omit<EmailNotification, "id" | "createdAt" | "updatedAt">[]): Promise<boolean[]> {
    const results = await Promise.allSettled(notifications.map((notification) => this.sendEmail(notification)))

    return results.map((result) => result.status === "fulfilled" && result.value)
  }

  generateUnsubscribeToken(userId: string): string {
    // In production, use a proper JWT or secure token generation
    return Buffer.from(`${userId}:${Date.now()}`).toString("base64")
  }

  validateUnsubscribeToken(token: string): { userId: string; timestamp: number } | null {
    try {
      const decoded = Buffer.from(token, "base64").toString("utf-8")
      const [userId, timestamp] = decoded.split(":")
      return { userId, timestamp: Number.parseInt(timestamp) }
    } catch {
      return null
    }
  }
}

// Mock data for development
export const mockEmailPreferences: EmailPreferences = {
  userId: "user1",
  email: "user@example.com",
  isVerified: true,
  unsubscribeToken: "eyJ1c2VySWQiOiJ1c2VyMSIsInRpbWVzdGFtcCI6MTcwNzI0MDAwMH0=",
  preferences: {
    habitReminders: true,
    dailyReflection: true,
    weeklyReview: true,
    achievementAlerts: true,
    contractReminders: true,
    marketingEmails: false,
  },
  frequency: "immediate",
  timezone: "America/New_York",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export const mockEmailNotifications: EmailNotification[] = [
  {
    id: "1",
    userId: "user1",
    email: "user@example.com",
    templateId: "habit_reminder",
    subject: "Time to Log Your Habits - GRYT",
    content: "Daily habit reminder",
    variables: {
      userName: "Alex",
      streakCount: "7",
      todayDate: new Date().toLocaleDateString(),
      unsubscribeToken: "eyJ1c2VySWQiOiJ1c2VyMSIsInRpbWVzdGFtcCI6MTcwNzI0MDAwMH0=",
    },
    scheduledFor: new Date().toISOString(),
    status: "sent",
    sentAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    retryCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "2",
    userId: "user1",
    email: "user@example.com",
    templateId: "weekly_review",
    subject: "Your Weekly Habit Summary - GRYT",
    content: "Weekly habit review",
    variables: {
      userName: "Alex",
      weekStart: "Dec 1",
      weekEnd: "Dec 7",
      totalHabits: "23",
      positiveHabits: "18",
      topCategory: "Health",
      unsubscribeToken: "eyJ1c2VySWQiOiJ1c2VyMSIsInRpbWVzdGFtcCI6MTcwNzI0MDAwMH0=",
    },
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    status: "pending",
    retryCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]
