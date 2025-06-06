export interface ContractTemplate {
  id: string
  title: string
  category: string
  icon: string
  description: string
  identity: string
  gratitude: string
  goal: string
  sacrifices: string
  habits: string
  suggestedTimeframe: number // days
}

export const contractTemplates: ContractTemplate[] = [
  {
    id: "fitness-transformation",
    title: "Fitness Transformation",
    category: "Health & Fitness",
    icon: "💪",
    description: "Transform your physical health and build lasting fitness habits",
    identity:
      "I am someone who values my health and believes that a strong body leads to a strong mind. I understand that fitness is not just about appearance, but about feeling confident, energetic, and capable in everything I do. I am committed to treating my body with respect and giving it the care it deserves.",
    gratitude:
      "I am grateful for my body and all that it allows me to do each day. I appreciate having access to nutritious food, clean water, and safe spaces to exercise. I'm thankful for the opportunity to improve my health and the support system that encourages me along this journey.",
    goal: "I will lose 20 pounds of body fat while gaining lean muscle mass, improve my cardiovascular endurance to run a 5K without stopping, and establish a consistent workout routine that I can maintain long-term.",
    sacrifices:
      "I will give up late-night snacking and mindless eating while watching TV. I will sacrifice some social events that revolve around unhealthy food choices. I will wake up 1 hour earlier each day to make time for exercise, which means going to bed earlier and reducing my screen time in the evenings.",
    habits:
      "I will work out for at least 45 minutes, 5 days per week, combining strength training and cardio. I will meal prep every Sunday and track my nutrition. I will drink at least 8 glasses of water daily. I will get 7-8 hours of quality sleep each night. I will take progress photos and measurements weekly to track my transformation.",
    suggestedTimeframe: 90,
  },
  {
    id: "career-advancement",
    title: "Career Advancement",
    category: "Professional Growth",
    icon: "🚀",
    description: "Accelerate your career growth and achieve professional success",
    identity:
      "I am a dedicated professional who takes ownership of my career growth. I believe in continuous learning and am committed to adding value wherever I work. I see challenges as opportunities to grow and am not afraid to step outside my comfort zone to achieve my professional goals.",
    gratitude:
      "I am grateful for the job I have and the skills I've developed so far. I appreciate my colleagues who support and challenge me, and I'm thankful for the opportunities I've been given to learn and grow. I value the financial stability my career provides and the chance to make a meaningful impact through my work.",
    goal: "I will earn a promotion to [specific position] with a salary increase of at least [amount/percentage]. I will expand my skill set by learning [specific skills/technologies] and will build a professional network of at least 50 meaningful connections in my industry.",
    sacrifices:
      "I will give up excessive leisure time and redirect it toward professional development. I will sacrifice some weekend relaxation to attend networking events and industry conferences. I will invest my own money in courses, certifications, and professional development resources.",
    habits:
      "I will dedicate 1 hour each day to learning new skills relevant to my field. I will reach out to at least 2 new professional contacts each week. I will volunteer for challenging projects at work. I will read industry publications and stay updated on trends. I will practice public speaking and presentation skills monthly.",
    suggestedTimeframe: 365,
  },
  {
    id: "financial-freedom",
    title: "Financial Freedom",
    category: "Finance & Wealth",
    icon: "💰",
    description: "Build wealth, eliminate debt, and achieve financial independence",
    identity:
      "I am someone who understands that financial freedom is not about having unlimited money, but about having choices and security. I believe in living below my means, investing wisely, and building wealth through discipline and smart decisions. I am committed to breaking any negative financial patterns and creating a secure future for myself and my family.",
    gratitude:
      "I am grateful for the income I earn and the opportunities I have to improve my financial situation. I appreciate having access to financial education and investment opportunities. I'm thankful for the roof over my head, food on my table, and the chance to build a better financial future.",
    goal: "I will save $[amount] for my emergency fund, pay off $[amount] in debt, and invest $[amount] in my retirement accounts. I will increase my net worth by $[amount] and establish multiple streams of income to reduce financial risk.",
    sacrifices:
      "I will give up unnecessary subscriptions and impulse purchases. I will sacrifice dining out frequently and expensive entertainment. I will drive my current car longer instead of upgrading. I will reduce my living expenses by [specific amount] each month and redirect that money toward my financial goals.",
    habits:
      "I will track every expense and review my budget weekly. I will automatically save 20% of my income before spending on anything else. I will read one financial education book per month. I will review and optimize my investments quarterly. I will find ways to increase my income through side hustles or skill development.",
    suggestedTimeframe: 365,
  },
  {
    id: "relationship-building",
    title: "Relationship Building",
    category: "Personal Relationships",
    icon: "❤️",
    description: "Strengthen existing relationships and build meaningful new connections",
    identity:
      "I am someone who values deep, meaningful relationships over superficial connections. I believe that investing in relationships is one of the most important things I can do for my happiness and fulfillment. I am committed to being a better friend, family member, and partner by showing up consistently and authentically.",
    gratitude:
      "I am grateful for the people in my life who love and support me. I appreciate the friends who have stood by me through good times and bad. I'm thankful for my family and the foundation they've provided. I value the opportunity to create new meaningful connections and deepen existing relationships.",
    goal: "I will strengthen my relationships with [specific people] by spending quality time together regularly. I will resolve any ongoing conflicts or misunderstandings. I will build [number] new meaningful friendships and become a more supportive, present, and communicative person in all my relationships.",
    sacrifices:
      "I will give up excessive screen time and social media scrolling when I'm with others. I will sacrifice some alone time to prioritize relationship-building activities. I will let go of grudges and pride that prevent me from deepening connections. I will reduce time spent on activities that isolate me from others.",
    habits:
      "I will reach out to at least one friend or family member each day with a meaningful message or call. I will schedule regular one-on-one time with important people in my life. I will practice active listening and put away devices during conversations. I will remember and acknowledge important dates and events in others' lives. I will express gratitude and appreciation to people regularly.",
    suggestedTimeframe: 180,
  },
  {
    id: "creative-mastery",
    title: "Creative Mastery",
    category: "Arts & Creativity",
    icon: "🎨",
    description: "Develop your creative skills and express your artistic vision",
    identity:
      "I am a creative person with unique ideas and perspectives to share with the world. I believe that creativity is not just a hobby but an essential part of who I am. I am committed to developing my artistic skills and finding ways to express my creativity regularly, regardless of whether others understand or appreciate my work.",
    gratitude:
      "I am grateful for my creative abilities and the joy that artistic expression brings to my life. I appreciate the artists who have inspired me and the access I have to creative tools and resources. I'm thankful for the opportunity to create something meaningful and to share my unique perspective with others.",
    goal: "I will complete [specific creative project] and develop proficiency in [specific creative skill]. I will create [number] finished pieces and share my work with others through [platform/method]. I will establish a consistent creative practice that brings me joy and fulfillment.",
    sacrifices:
      "I will give up perfectionism that prevents me from starting or finishing creative projects. I will sacrifice some entertainment time to dedicate to my creative practice. I will let go of the fear of judgment and criticism from others. I will invest money in quality tools and materials for my creative work.",
    habits:
      "I will dedicate at least 30 minutes each day to creative practice, even if it's just sketching or brainstorming. I will complete one creative project each month, regardless of size. I will seek feedback from other creatives and join a community of artists. I will document my creative journey and progress. I will experiment with new techniques and styles regularly.",
    suggestedTimeframe: 180,
  },
  {
    id: "mental-wellness",
    title: "Mental Wellness",
    category: "Mental Health",
    icon: "🧠",
    description: "Improve your mental health and develop emotional resilience",
    identity:
      "I am someone who prioritizes my mental health and understands that it's just as important as my physical health. I believe in the power of self-awareness, emotional intelligence, and mental resilience. I am committed to developing healthy coping mechanisms and creating a positive mindset that serves me in all areas of life.",
    gratitude:
      "I am grateful for my ability to think, feel, and experience life fully. I appreciate the mental health resources available to me and the people who support my wellbeing. I'm thankful for each day I have to work on becoming a mentally healthier and more resilient person.",
    goal: "I will develop better stress management skills and reduce my anxiety levels significantly. I will establish a consistent mindfulness practice and improve my emotional regulation. I will build stronger mental resilience and create healthier thought patterns that support my overall wellbeing.",
    sacrifices:
      "I will give up negative self-talk and self-criticism. I will sacrifice time spent on social media that makes me feel worse about myself. I will let go of toxic relationships and situations that drain my mental energy. I will reduce my exposure to negative news and content that increases my anxiety.",
    habits:
      "I will practice meditation or mindfulness for at least 10 minutes each day. I will journal my thoughts and feelings regularly to increase self-awareness. I will exercise regularly as it benefits my mental health. I will maintain a consistent sleep schedule. I will practice gratitude daily and challenge negative thought patterns when they arise.",
    suggestedTimeframe: 120,
  },
  {
    id: "learning-growth",
    title: "Learning & Growth",
    category: "Education & Skills",
    icon: "📚",
    description: "Commit to lifelong learning and personal development",
    identity:
      "I am a lifelong learner who believes that growth and education never stop. I understand that investing in my knowledge and skills is one of the best investments I can make. I am curious about the world and committed to expanding my understanding and capabilities throughout my life.",
    gratitude:
      "I am grateful for my ability to learn and access to educational resources. I appreciate the teachers and mentors who have guided me. I'm thankful for the internet and libraries that provide unlimited learning opportunities. I value the chance to grow and improve myself every day.",
    goal: "I will master [specific skill or subject] and earn [certification/degree/credential]. I will read [number] books this year and complete [number] online courses. I will develop expertise in [area] that will enhance both my personal and professional life.",
    sacrifices:
      "I will give up mindless entertainment and redirect that time toward learning. I will sacrifice some social activities to dedicate time to studying. I will invest money in courses, books, and educational resources instead of unnecessary purchases. I will wake up earlier or stay up later to create dedicated learning time.",
    habits:
      "I will read for at least 30 minutes every day. I will take notes and review what I've learned weekly. I will apply new knowledge through practice and real-world projects. I will teach others what I'm learning to reinforce my understanding. I will seek out mentors and join learning communities in my areas of interest.",
    suggestedTimeframe: 365,
  },
  {
    id: "spiritual-growth",
    title: "Spiritual Growth",
    category: "Spirituality & Purpose",
    icon: "🙏",
    description: "Deepen your spiritual practice and find greater meaning in life",
    identity:
      "I am a spiritual being seeking deeper meaning and connection in my life. I believe there is something greater than myself and I am committed to exploring and nurturing my spiritual side. I understand that spiritual growth is a personal journey that requires patience, openness, and consistent practice.",
    gratitude:
      "I am grateful for the opportunity to explore my spirituality and seek deeper meaning in life. I appreciate the wisdom of spiritual teachers and the community of others on similar journeys. I'm thankful for moments of peace, connection, and transcendence that remind me of what's truly important.",
    goal: "I will establish a consistent spiritual practice that brings me peace and clarity. I will deepen my understanding of [specific spiritual tradition/practice] and find greater purpose and meaning in my daily life. I will develop a stronger connection to my inner wisdom and higher purpose.",
    sacrifices:
      "I will give up cynicism and skepticism that blocks my spiritual growth. I will sacrifice some material pursuits to focus on spiritual development. I will let go of ego-driven behaviors and judgments of others. I will reduce distractions that prevent me from connecting with my spiritual side.",
    habits:
      "I will spend time in prayer, meditation, or spiritual reflection daily. I will study spiritual texts or teachings regularly. I will practice compassion and service to others. I will spend time in nature to connect with something greater than myself. I will regularly examine my values and ensure my actions align with my spiritual beliefs.",
    suggestedTimeframe: 365,
  },
]

export const getTemplatesByCategory = () => {
  const categories = contractTemplates.reduce(
    (acc, template) => {
      if (!acc[template.category]) {
        acc[template.category] = []
      }
      acc[template.category].push(template)
      return acc
    },
    {} as Record<string, ContractTemplate[]>,
  )

  return categories
}

export const getTemplateById = (id: string) => {
  return contractTemplates.find((template) => template.id === id)
}
