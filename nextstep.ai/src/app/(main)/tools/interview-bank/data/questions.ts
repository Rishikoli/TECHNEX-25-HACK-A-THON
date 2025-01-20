import { QuestionBank } from '../types';

export const questionBank: QuestionBank = {
  introduction: [
    {
      id: 'intro-1',
      question: 'Tell me about yourself',
      modelAnswer: "I am a [Your Role] with [X] years of experience in [Key Areas]. Currently at [Current/Last Company], I have been focusing on [Main Responsibilities/Achievements]. Prior to this, I worked at [Previous Company] where I [Key Achievement].\n\nMy educational background includes [Degree] from [University], and I have continuously enhanced my skills through [Certifications/Training].\n\nWhat really drives me is [Your Passion/Professional Interest]. I am particularly excited about this opportunity at [Company Name] because [Specific Reason aligned with role/company].",
      tips: [
        'Start with present, then past, then future aspirations',
        'Keep it professional and relevant to the role',
        'Aim for 1-2 minutes in length',
        'Highlight achievements rather than just responsibilities',
        'End with why you are interested in this specific role'
      ],
      category: 'introduction',
      importance: 'high',
      commonFollowUps: [
        'What made you choose this career path?',
        'Why are you looking to leave your current role?'
      ],
      thingsToAvoid: [
        'Personal information unrelated to the job',
        'Negative comments about previous employers',
        'Too much detail about early career/education',
        'Rambling or going over 2 minutes'
      ],
      preparationPoints: [
        'Research the company and role thoroughly',
        'Identify key achievements relevant to the role',
        'Practice timing and delivery',
        'Prepare transitions between points'
      ]
    }
  ],
  experience: [
    {
      id: 'exp-1',
      question: 'What is your greatest professional achievement?',
      modelAnswer: "One of my most significant achievements was at [Company Name], where I led a project to [Specific Project]. The challenge was [Problem/Challenge faced].\n\nUsing my skills in [Relevant Skills], I [Actions Taken]. I collaborated with [Team/Stakeholders] and implemented [Specific Solutions].\n\nAs a result, we achieved [Quantifiable Results - e.g., increased efficiency by 25%, saved $X, improved customer satisfaction by Y%]. This project not only [Business Impact] but also [Personal/Team Growth].\n\nThis experience taught me [Key Learnings] and has prepared me well for [How it relates to the role you are interviewing for].",
      tips: [
        'Use the STAR method (Situation, Task, Action, Result)',
        'Choose an achievement relevant to the role',
        'Include specific metrics and results',
        'Show both technical and soft skills'
      ],
      category: 'experience',
      importance: 'high',
      commonFollowUps: [
        'How did you overcome the challenges in this project?',
        'What would you do differently if you had to do it again?'
      ]
    }
  ],
  behavioral: [
    {
      id: 'beh-1',
      question: 'How do you handle conflict in the workplace?',
      modelAnswer: "I approach workplace conflicts with a focus on professional resolution and maintaining positive relationships. Let me share a specific example:\n\nAt [Previous Company], I encountered a situation where [Specific Conflict Situation]. The main challenge was [Core Issue].\n\nI took the following approach:\n1. First, I [Initial Action - e.g., scheduled a private meeting]\n2. Then, I [Process - e.g., actively listened to their perspective]\n3. We collaborated to [Resolution Steps]\n\nThe outcome was [Positive Result], and our working relationship actually improved afterward. This experience taught me [Key Learning], and I now [How you have grown/changed approach].",
      tips: [
        'Use a real example but keep it professional',
        'Focus on the resolution process',
        'Highlight communication and problem-solving skills',
        'Show growth and learning from the experience'
      ],
      category: 'behavioral',
      importance: 'high'
    }
  ],
  technical: [
    {
      id: 'tech-1',
      question: 'Explain your approach to problem-solving',
      modelAnswer: "My approach to problem-solving follows a structured methodology:\n\n1. Problem Understanding:\n   - Gather all available information\n   - Clarify requirements and constraints\n   - Define success criteria\n\n2. Analysis:\n   - Break down complex problems into smaller components\n   - Identify potential roadblocks\n   - Research similar problems and solutions\n\n3. Solution Design:\n   - Brainstorm multiple approaches\n   - Evaluate pros and cons of each\n   - Select the most appropriate solution\n\n4. Implementation:\n   - Create a detailed action plan\n   - Execute in incremental steps\n   - Document progress and learnings\n\n5. Validation:\n   - Test the solution thoroughly\n   - Gather feedback\n   - Measure against success criteria\n\nLet me give you a specific example: [Brief STAR example demonstrating this approach]",
      tips: [
        'Use a clear, structured approach',
        'Include both theoretical and practical aspects',
        'Demonstrate analytical thinking',
        'Show how you learn from outcomes'
      ],
      category: 'technical',
      importance: 'high'
    }
  ],
  company: [
    {
      id: 'comp-1',
      question: 'Why do you want to work for our company?',
      modelAnswer: "I am particularly excited about [Company Name] for several reasons:\n\n1. Innovation and Impact:\n   - Your work on [Specific Project/Product]\n   - The company's mission to [Company Mission]\n   - The impact you are making in [Industry/Field]\n\n2. Culture and Values:\n   - Your commitment to [Company Value]\n   - The emphasis on [Cultural Aspect]\n   - The collaborative environment\n\n3. Growth and Development:\n   - The opportunities for [Specific Growth Areas]\n   - The company's investment in [Training/Development Programs]\n   - The trajectory of [Company's Growth/Future Plans]\n\n4. Role Alignment:\n   - The position's focus on [Key Responsibilities]\n   - The opportunity to [Specific Impact]\n   - The chance to contribute my expertise in [Your Skills]",
      tips: [
        'Show specific research about the company',
        'Align your values with company values',
        'Demonstrate enthusiasm and genuine interest',
        'Connect company goals with your career goals'
      ],
      category: 'company',
      importance: 'high'
    }
  ],
  career: [
    {
      id: 'career-1',
      question: 'Where do you see yourself in 5 years?',
      modelAnswer: "In the next 5 years, I envision growing both professionally and technically in ways that benefit both my career and the organization I am part of.\n\nShort-term goals (1-2 years):\n- Master [Specific Skills relevant to role]\n- Take on increasing responsibility in [Area of Work]\n- Contribute to [Specific Type of Projects]\n\nMedium-term goals (3-5 years):\n- Develop expertise in [Emerging Technology/Area]\n- Move into [Leadership/Specialist Role]\n- Lead initiatives in [Specific Area]\n\nI am particularly excited about [Industry Trend/Development] and hope to [Specific Contribution]. I believe this role at [Company] aligns perfectly with these goals because [Specific Reason].",
      tips: [
        'Show ambition while being realistic',
        'Align personal goals with company growth',
        'Demonstrate commitment to learning',
        'Keep focus on professional development'
      ],
      category: 'career',
      importance: 'high'
    }
  ],
  closing: [
    {
      id: 'close-1',
      question: 'Do you have any questions for us?',
      modelAnswer: 'Yes, I have several questions:\n\nAbout the Role:\n1. "What does success look like in this role after 6 months?"\n2. "Can you describe the typical day-to-day responsibilities?"\n\nAbout the Team:\n3. "How is the team structured, and who would I be working with directly?"\n4. "What is the team\'s biggest challenge right now?"\n\nAbout Growth:\n5. "What opportunities are there for professional development?"\n6. "How does the company support learning and skill advancement?"\n\nAbout Next Steps:\n7. "What are the next steps in the interview process?"\n8. "What is your timeline for making a decision?"',
      tips: [
        'Always have questions prepared',
        'Show genuine interest in the role and company',
        'Ask about both current state and future plans',
        'Avoid questions about basic information available online'
      ],
      category: 'closing',
      importance: 'high',
      thingsToAvoid: [
        'Questions about salary/benefits too early',
        'Basic questions answered on website',
        'Too many questions about time off/perks',
        'Overly personal questions'
      ]
    }
  ]
};
