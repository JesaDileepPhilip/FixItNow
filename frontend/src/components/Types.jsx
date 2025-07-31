// src/components/Types.jsx

export const mockIssues = [
  {
    id: '1',
    title: 'Large Pothole on MG Road',
    description:
      'There is a dangerous pothole near the MG Road junction that is causing damage to vehicles and creating traffic hazards.',
    category: 'Road',
    status: 'Pending',
    location: 'MG Road, District 1',
    imageUrl:
      'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400',
    upvotes: 24,
    submittedBy: 'John Doe',
    submittedAt: '2024-01-15T10:30:00Z',
    comments: [
      {
        id: 'c1',
        author: 'Jane Smith',
        content: 'I saw this too, very dangerous especially during rain.',
        timestamp: '2024-01-15T14:20:00Z',
      },
    ],
  },
  {
    id: '2',
    title: 'Overflowing Garbage in Sector 12',
    description:
      'Garbage has not been collected in Sector 12 for over a week, leading to foul smell and health concerns among residents.',
    category: 'Waste Management',
    status: 'In Progress',
    location: 'Sector 12, District 2',
    imageUrl:
      'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400',
    upvotes: 18,
    submittedBy: 'Alice Brown',
    submittedAt: '2024-01-14T09:00:00Z',
    comments: [],
  },
  {
    id: '3',
    title: 'Streetlight Not Working',
    description:
      'Streetlight on 5th Avenue near the park has not been working for days, making the area unsafe at night.',
    category: 'Lighting',
    status: 'Resolved',
    location: '5th Avenue, District 3',
    imageUrl:
     'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400',
    upvotes: 12,
    submittedBy: 'Carlos Lopez',
    submittedAt: '2024-01-13T21:45:00Z',
    comments: [
      {
        id: 'c2',
        author: 'Diana Patel',
        content: 'Thanks for fixing this quickly!',
        timestamp: '2024-01-15T12:00:00Z',
      },
    ],
  },
];
