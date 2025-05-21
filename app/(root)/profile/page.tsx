"use client";
import React, { useState } from "react";
import * as Select from "@radix-ui/react-select";

// Define the form data type
interface FormData {
  education: string;
  currency: string;
  age: string;
  devType: string;
  orgSize: string;
  aiSelect: string;
  experience: number;
  yearsCode: number;
  yearsCodePro: number;
  remoteWork: string;
  databases: string[];
  languages: string[];
  learningSources: string[];
}

const Page = () => {
  const [formData, setFormData] = useState<FormData>({
    education: "",
    currency: "",
    age: "",
    devType: "",
    orgSize: "",
    aiSelect: "",
    experience: 3,
    yearsCode: 3,
    yearsCodePro: 3,
    remoteWork: "",
    databases: [],
    languages: [],
    learningSources: [],
  });

  const [predictedSalary, setPredictedSalary] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (name: keyof FormData, value: string | number | string[]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const predictSalary = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/predict-salary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Age: formData.age,
          AISelect: formData.aiSelect,
          OrgSize: formData.orgSize,
          DevType: formData.devType,
          YearsCode: formData.yearsCode,
          WorkExp: formData.experience,
          YearsCodePro: formData.yearsCodePro,
          RemoteWork: formData.remoteWork,
          Currency: formData.currency,
          EdLevel: formData.education,
          LanguageHaveWorkedWith: formData.languages.join('; '),
          DatabaseHaveWorkedWith: formData.databases.join('; '),
          LearnCode: formData.learningSources.join('; ')
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to predict salary');
      }

      const data = await response.json();
      setPredictedSalary(data.predicted_salary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Options for select fields
  const ageOptions = [
    "18-24 years old",
    "25-34 years old",
    "35-44 years old",
    "45-54 years old",
    "55-64 years old",
    "65 years or older",
    "Prefer not to say"
  ];

  const devTypeOptions = [
    'Senior Executive (C-Suite, VP, etc.)', 
    'Developer, back-end', 
    'Developer, front-end', 
    'Developer, full-stack', 
    'System administrator', 
    'Developer, QA or test', 
    'Designer', 
    'Data scientist or machine learning specialist', 
    'Data or business analyst', 
    'Security professional', 
    'Research & Development role', 
    'Developer, mobile', 
    'Database administrator', 
    'Developer, embedded applications or devices', 
    'Developer, desktop or enterprise applications', 
    'Engineer, data', 
    'Product manager', 
    'Academic researcher', 
    'Cloud infrastructure engineer', 
    'Other (please specify):', 
    'Developer Experience', 
    'Engineering manager', 
    'DevOps specialist', 
    'Engineer, site reliability', 
    'Project manager', 
    'Blockchain', 
    'Developer, game or graphics', 
    'Developer Advocate', 
    'Hardware Engineer', 
    'Educator', 
    'Scientist', 
    'Marketing or sales professional', 
    'Student'
  ];

  const orgSizeOptions = [
    '2 to 9 employees', 
    '10 to 19 employees', 
    '20 to 99 employees', 
    '100 to 499 employees', 
    '500 to 999 employees', 
    '1,000 to 4,999 employees', 
    '5,000 to 9,999 employees', 
    '10,000 or more employees', 
    'Just me - I am a freelancer, sole proprietor, etc.', 
    'I don\'t know'
  ];

  const aiSelectOptions = [
    'Yes', 
    "No, and I don't plan to", 
    'No, but I plan to soon'
  ];

  const remoteWorkOptions = [
    'Remote', 
    'Hybrid (some remote, some in-person)', 
    'In-person', 
    "Other"
  ];

  const currencyOptions = [
    'USD - United States dollar', 
    'INR - Indian rupee'
  ];

  const educationLevelOptions = [
    `Bachelor's degree (B.A., B.S., B.Eng., etc.)`, 
    'Some college/university study without earning a degree', 
    `Master's degree (M.A., M.S., M.Eng., MBA, etc.)`, 
    'Primary/elementary school', 
    'Professional degree (JD, MD, Ph.D, Ed.D, etc.)', 
    'Associate degree (A.A., A.S., etc.)', 
    'Secondary school (e.g. American high school, German Realschule or Gymnasium, etc.)', 
    'Something else'
  ];

  const databaseOptions = [
    'MySQL',
    'PostgreSQL',
    'SQLite',
    'MongoDB',
    'Redis',
    'Oracle',
    'Microsoft SQL Server',
    'MariaDB',
    'Cassandra',
    'Elasticsearch',
    'Firebase',
    'DynamoDB',
    'Neo4j',
    'CouchDB',
    'RethinkDB'
  ];

  const languageOptions = [
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'C#',
    'PHP',
    'TypeScript',
    'Ruby',
    'Swift',
    'Kotlin',
    'Go',
    'Rust',
    'Scala',
    'R',
    'MATLAB',
    'HTML/CSS',
    'SQL',
    'Shell',
    'Perl',
    'Haskell',
    'Clojure',
    'Dart',
    'Lua',
    'Assembly',
    'Objective-C',
    'Visual Basic',
    'Groovy',
    'Elixir',
    'F#',
    'COBOL',
    'Fortran',
    'Lisp',
    'Pascal',
    'Prolog',
    'Smalltalk',
    'Tcl',
    'VBA',
    'WebAssembly'
  ];

  const learningSourceOptions = [
    'Online courses',
    'Bootcamps',
    'Books / Physical media',
    'Colleague',
    'On the job training',
    'School / University',
    'Documentation',
    'Stack Overflow',
    'YouTube',
    'Blogs',
    'Podcasts',
    'Meetups / Conferences',
    'Open source projects',
    'Trial and error',
    'Other'
  ];

  // Function to handle multi-select
  const handleMultiSelect = (name: 'databases' | 'languages' | 'learningSources', value: string, checked: boolean) => {
    setFormData(prev => {
      const currentValues = [...prev[name]];
      if (checked) {
        return { ...prev, [name]: [...currentValues, value] };
      } else {
        return { ...prev, [name]: currentValues.filter(item => item !== value) };
      }
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg shadow-md">
      <h3 className="text-3xl font-extrabold mb-6 text-center">Software Developer Salary Prediction</h3>
      <p className="text-center mb-6">We need some information to predict the salary</p>
      
      <form className="space-y-6" onSubmit={(e) => {
        e.preventDefault();
        predictSalary();
      }}>
        {/* Education Level */}
        <div>
          <label className="block text-sm font-semibold mb-2">Education Level:</label>
          <Select.Root
            value={formData.education}
            onValueChange={(value) => handleChange("education", value)}
          >
            <Select.Trigger
              className="border rounded px-4 py-2 w-full bg-white dark:bg-gray-800 text-left text-gray-700 dark:text-gray-200 flex items-center justify-between"
            >
              <Select.Value placeholder="Select" />
              <Select.Icon className="text-gray-500 dark:text-gray-400">▼</Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                className="bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700"
                position="popper"
              >
                <Select.Viewport className="p-2">
                  {educationLevelOptions.map((option) => (
                    <Select.Item
                      key={option}
                      value={option}
                      className="px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-600 cursor-pointer text-gray-700 dark:text-gray-200"
                    >
                      <Select.ItemText>{option}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-semibold mb-2">Age:</label>
          <Select.Root
            value={formData.age}
            onValueChange={(value) => handleChange("age", value)}
          >
            <Select.Trigger
              className="border rounded px-4 py-2 w-full bg-white dark:bg-gray-800 text-left text-gray-700 dark:text-gray-200 flex items-center justify-between"
            >
              <Select.Value placeholder="Select" />
              <Select.Icon className="text-gray-500 dark:text-gray-400">▼</Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                className="bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700"
                position="popper"
              >
                <Select.Viewport className="p-2">
                  {ageOptions.map((option) => (
                    <Select.Item
                      key={option}
                      value={option}
                      className="px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-600 cursor-pointer text-gray-700 dark:text-gray-200"
                    >
                      <Select.ItemText>{option}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* Developer Type */}
        <div>
          <label className="block text-sm font-semibold mb-2">Developer Type:</label>
          <Select.Root
            value={formData.devType}
            onValueChange={(value) => handleChange("devType", value)}
          >
            <Select.Trigger
              className="border rounded px-4 py-2 w-full bg-white dark:bg-gray-800 text-left text-gray-700 dark:text-gray-200 flex items-center justify-between"
            >
              <Select.Value placeholder="Select" />
              <Select.Icon className="text-gray-500 dark:text-gray-400">▼</Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                className="bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700"
                position="popper"
              >
                <Select.Viewport className="p-2">
                  {devTypeOptions.map((option) => (
                    <Select.Item
                      key={option}
                      value={option}
                      className="px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-600 cursor-pointer text-gray-700 dark:text-gray-200"
                    >
                      <Select.ItemText>{option}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* Organization Size */}
        <div>
          <label className="block text-sm font-semibold mb-2">Organization Size:</label>
          <Select.Root
            value={formData.orgSize}
            onValueChange={(value) => handleChange("orgSize", value)}
          >
            <Select.Trigger
              className="border rounded px-4 py-2 w-full bg-white dark:bg-gray-800 text-left text-gray-700 dark:text-gray-200 flex items-center justify-between"
            >
              <Select.Value placeholder="Select" />
              <Select.Icon className="text-gray-500 dark:text-gray-400">▼</Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                className="bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700"
                position="popper"
              >
                <Select.Viewport className="p-2">
                  {orgSizeOptions.map((option) => (
                    <Select.Item
                      key={option}
                      value={option}
                      className="px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-600 cursor-pointer text-gray-700 dark:text-gray-200"
                    >
                      <Select.ItemText>{option}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* AI Usage */}
        <div>
          <label className="block text-sm font-semibold mb-2">Do you currently use AI tools in your development process?</label>
          <Select.Root
            value={formData.aiSelect}
            onValueChange={(value) => handleChange("aiSelect", value)}
          >
            <Select.Trigger
              className="border rounded px-4 py-2 w-full bg-white dark:bg-gray-800 text-left text-gray-700 dark:text-gray-200 flex items-center justify-between"
            >
              <Select.Value placeholder="Select" />
              <Select.Icon className="text-gray-500 dark:text-gray-400">▼</Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                className="bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700"
                position="popper"
              >
                <Select.Viewport className="p-2">
                  {aiSelectOptions.map((option) => (
                    <Select.Item
                      key={option}
                      value={option}
                      className="px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-600 cursor-pointer text-gray-700 dark:text-gray-200"
                    >
                      <Select.ItemText>{option}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* Currency */}
        <div>
          <label className="block text-sm font-semibold mb-2">Which currency do you use day-to-day?</label>
          <Select.Root
            value={formData.currency}
            onValueChange={(value) => handleChange("currency", value)}
          >
            <Select.Trigger
              className="border rounded px-4 py-2 w-full bg-white dark:bg-gray-800 text-left text-gray-700 dark:text-gray-200 flex items-center justify-between"
            >
              <Select.Value placeholder="Select" />
              <Select.Icon className="text-gray-500 dark:text-gray-400">▼</Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                className="bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700"
                position="popper"
              >
                <Select.Viewport className="p-2">
                  {currencyOptions.map((option) => (
                    <Select.Item
                      key={option}
                      value={option}
                      className="px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-600 cursor-pointer text-gray-700 dark:text-gray-200"
                    >
                      <Select.ItemText>{option}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-semibold mb-2">Years of Experience: {formData.experience}</label>
          <input
            type="range"
            min="0"
            max="50"
            value={formData.experience}
            onChange={(e) => handleChange("experience", Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Years of Coding */}
        <div>
          <label className="block text-sm font-semibold mb-2">Years of Coding Experience: {formData.yearsCode}</label>
          <input
            type="range"
            min="0"
            max="50"
            value={formData.yearsCode}
            onChange={(e) => handleChange("yearsCode", Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Years of Professional Coding */}
        <div>
          <label className="block text-sm font-semibold mb-2">Years of Professional Coding Experience: {formData.yearsCodePro}</label>
          <input
            type="range"
            min="0"
            max="50"
            value={formData.yearsCodePro}
            onChange={(e) => handleChange("yearsCodePro", Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Remote Work */}
        <div>
          <label className="block text-sm font-semibold mb-2">Current Work Situation Description:</label>
          <Select.Root
            value={formData.remoteWork}
            onValueChange={(value) => handleChange("remoteWork", value)}
          >
            <Select.Trigger
              className="border rounded px-4 py-2 w-full bg-white dark:bg-gray-800 text-left text-gray-700 dark:text-gray-200 flex items-center justify-between"
            >
              <Select.Value placeholder="Select" />
              <Select.Icon className="text-gray-500 dark:text-gray-400">▼</Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                className="bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700"
                position="popper"
              >
                <Select.Viewport className="p-2">
                  {remoteWorkOptions.map((option) => (
                    <Select.Item
                      key={option}
                      value={option}
                      className="px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-600 cursor-pointer text-gray-700 dark:text-gray-200"
                    >
                      <Select.ItemText>{option}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* Databases */}
        <div>
          <label className="block text-sm font-semibold mb-2">Databases you have worked with:</label>
          <div className="border rounded p-4 bg-white dark:bg-gray-800 max-h-60 overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              {databaseOptions.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`db-${option}`}
                    checked={formData.databases.includes(option)}
                    onChange={(e) => handleMultiSelect("databases", option, e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor={`db-${option}`} className="text-sm">{option}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Languages */}
        <div>
          <label className="block text-sm font-semibold mb-2">Programming Languages you have worked with:</label>
          <div className="border rounded p-4 bg-white dark:bg-gray-800 max-h-60 overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              {languageOptions.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`lang-${option}`}
                    checked={formData.languages.includes(option)}
                    onChange={(e) => handleMultiSelect("languages", option, e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor={`lang-${option}`} className="text-sm">{option}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Sources */}
        <div>
          <label className="block text-sm font-semibold mb-2">Learning Sources you have used:</label>
          <div className="border rounded p-4 bg-white dark:bg-gray-800 max-h-60 overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              {learningSourceOptions.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`source-${option}`}
                    checked={formData.learningSources.includes(option)}
                    onChange={(e) => handleMultiSelect("learningSources", option, e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor={`source-${option}`} className="text-sm">{option}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Calculating...' : 'Calculate Salary'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {predictedSalary !== null && (
        <div className="mt-6 p-6 bg-green-100 dark:bg-green-900 rounded-lg">
          <h4 className="text-xl font-bold mb-2">The estimated annual salary is</h4>
          <p className="text-2xl font-bold text-green-700 dark:text-green-300">
            ${predictedSalary.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;