import React from 'react';
import { DocumentTextIcon, LightBulbIcon, WrenchScrewdriverIcon, UserCircleIcon, ChatBubbleBottomCenterTextIcon, AcademicCapIcon, BriefcaseIcon, SparklesIcon, ChevronDoubleUpIcon } from '@heroicons/react/24/outline';

const Pill = ({ text, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    amber: 'bg-amber-100 text-amber-800',
  };
  return <span className={`inline-block text-xs font-medium mr-2 mb-2 px-3 py-1 rounded-full ${colorClasses[color]}`}>{text}</span>;
};

const Card = ({ title, icon, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <div className="flex items-center mb-4">
            {icon}
            <h3 className="text-xl font-bold text-gray-800 ml-3">{title}</h3>
        </div>
        {children}
    </div>
);

const AnalysisDisplay = ({ data }) => {
  if (!data) return null;

  const { personalDetails, content, skills, aiFeedback } = data;

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-green-500';
    if (rating >= 5) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-indigo-700 to-blue-600 text-white p-8 rounded-xl shadow-2xl">
        <div className="flex items-center mb-4">
          <SparklesIcon className="h-8 w-8 mr-3"/>
          <h2 className="text-3xl font-bold">AI Feedback Summary</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-lg text-indigo-200">Overall Score</p>
              <p className={`text-7xl font-extrabold ${getRatingColor(aiFeedback.rating)}`}>{aiFeedback.rating}<span className="text-4xl text-indigo-300">/10</span></p>
            </div>
            <div className="md:col-span-2">
              <p className="text-indigo-100 mb-4">{aiFeedback.summary}</p>
              <h4 className="font-bold mb-2 text-indigo-200">Key Improvement Areas:</h4>
              <ul className="list-disc list-inside space-y-1 text-indigo-100">
                {aiFeedback.improvements.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Skills Analysis" icon={<WrenchScrewdriverIcon className="h-7 w-7 text-indigo-500"/>}>
            <div className="mb-6">
                <h4 className="font-semibold text-lg mb-2 text-gray-700">Technical Skills</h4>
                <div>{skills.technical.map((skill, index) => <Pill key={index} text={skill} color="blue" />)}</div>
            </div>
            <div className="mb-6">
                <h4 className="font-semibold text-lg mb-2 text-gray-700">Soft Skills</h4>
                <div>{skills.soft.map((skill, index) => <Pill key={index} text={skill} color="green" />)}</div>
            </div>
            <div className="border-t pt-4">
                <div className="flex items-center mb-2">
                    <ChevronDoubleUpIcon className="h-5 w-5 mr-2 text-amber-500"/>
                    <h4 className="font-semibold text-lg text-gray-700">Upskilling Suggestions</h4>
                </div>
                <div>{aiFeedback.upskilling.map((skill, index) => <Pill key={index} text={skill} color="amber" />)}</div>
            </div>
        </Card>

        <Card title="Personal Details" icon={<UserCircleIcon className="h-7 w-7 text-indigo-500"/>}>
            <div className="space-y-2 text-gray-600">
                <p><strong>Name:</strong> {personalDetails.name}</p>
                <p><strong>Email:</strong> <a href={`mailto:${personalDetails.email}`} className="text-indigo-600 hover:underline">{personalDetails.email}</a></p>
                <p><strong>Phone:</strong> {personalDetails.phone}</p>
                <div className="mt-2">
                    <strong>Links:</strong>
                    <ul className="list-disc list-inside ml-4">
                        {personalDetails.links.map((link, i) => <li key={i}><a href={link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline break-all">{link}</a></li>)}
                    </ul>
                </div>
            </div>
        </Card>
      </div>

      <Card title="Extracted Resume Content" icon={<DocumentTextIcon className="h-7 w-7 text-indigo-500"/>}>
        <article className="prose prose-indigo max-w-none prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg">
            <h2><ChatBubbleBottomCenterTextIcon className="h-6 w-6 inline-block mr-2 align-bottom"/>Summary</h2>
            <p>{content.summary}</p>
            
            <h2><BriefcaseIcon className="h-6 w-6 inline-block mr-2 align-bottom"/>Work Experience</h2>
            {content.experience.map((exp, i) => (
                <div key={i} className="not-prose mb-6">
                    <h3 className="font-semibold text-lg text-gray-800">{exp.jobTitle} at {exp.company}</h3>
                    <p className="text-sm text-gray-500 italic mb-2">{exp.duration}</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {exp.responsibilities.map((res, j) => <li key={j}>{res}</li>)}
                    </ul>
                </div>
            ))}

            <h2><AcademicCapIcon className="h-6 w-6 inline-block mr-2 align-bottom"/>Education</h2>
            {content.education.map((edu, i) => (
                <div key={i} className="not-prose mb-2">
                    <p><strong>{edu.degree}</strong> - {edu.institution} ({edu.year})</p>
                </div>
            ))}
            
            <h2><LightBulbIcon className="h-6 w-6 inline-block mr-2 align-bottom"/>Projects</h2>
            {content.projects.map((proj, i) => (
                 <div key={i} className="not-prose mb-6">
                    <h3 className="font-semibold text-lg text-gray-800">{proj.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">Technologies: {proj.technologies.join(', ')}</p>
                    <p className="text-gray-600">{proj.description}</p>
                </div>
            ))}
        </article>
      </Card>
    </div>
  );
};

export default AnalysisDisplay;