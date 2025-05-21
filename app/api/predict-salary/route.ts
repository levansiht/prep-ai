import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'Age', 'AISelect', 'OrgSize', 'DevType', 'YearsCode', 
      'WorkExp', 'YearsCodePro', 'RemoteWork', 'Currency', 
      'EdLevel', 'LanguageHaveWorkedWith', 'DatabaseHaveWorkedWith', 'LearnCode'
    ];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Ensure numeric fields are numbers
    const numericFields = ['YearsCode', 'WorkExp', 'YearsCodePro'];
    for (const field of numericFields) {
      if (isNaN(Number(body[field]))) {
        return NextResponse.json(
          { error: `Field ${field} must be a number` },
          { status: 400 }
        );
      }
      body[field] = Number(body[field]);
    }
    
    // Call the FastAPI backend
    const response = await fetch('https://dev-salary-prediction-api.onrender.com/predict_salary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.detail || 'Failed to predict salary' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error predicting salary:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 