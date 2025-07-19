type FeedbackData = {
  email: string;
  userID: string;
  description: string;
  stars: number;
};

export default async function sendFeedback({ email, userID, description, stars }: FeedbackData): Promise<any> {
  const url = '/api/feedback';
  const data: FeedbackData = {
    email,
    userID,
    description,
    stars
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const result = await response.json();
    console.log('Feedback sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending feedback:', error);
    throw error;
  }
}
