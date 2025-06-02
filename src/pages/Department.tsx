
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Department: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const department = searchParams.get('dept') || 'general';

  const getDepartmentInfo = () => {
    switch (department) {
      case 'web':
        return {
          title: 'Web Development Department',
          description: 'Master modern web technologies including React, TypeScript, and responsive design.',
          skills: ['HTML5 & CSS3', 'JavaScript & TypeScript', 'React & Component Architecture', 'API Integration', 'Version Control (Git)'],
          resources: ['MDN Web Docs', 'React Documentation', 'TypeScript Handbook', 'CSS-Tricks', 'Frontend Masters']
        };
      case 'dispatch':
        return {
          title: 'Dispatch & Logistics Department',
          description: 'Learn efficient logistics management and dispatch operations.',
          skills: ['Route Optimization', 'Inventory Management', 'Communication Systems', 'Emergency Response', 'Data Analysis'],
          resources: ['Logistics Handbook', 'Supply Chain Guides', 'Emergency Protocols', 'Communication Best Practices', 'Analytics Tools']
        };
      case 'cybersecurity':
        return {
          title: 'Cybersecurity Department',
          description: 'Protect digital assets and understand security fundamentals.',
          skills: ['Network Security', 'Risk Assessment', 'Incident Response', 'Security Protocols', 'Threat Analysis'],
          resources: ['NIST Framework', 'Security+ Study Guide', 'OWASP Top 10', 'Cybersecurity News', 'Penetration Testing Tools']
        };
      default:
        return {
          title: 'General Department',
          description: 'Explore various technical domains and foundational skills.',
          skills: ['Problem Solving', 'Critical Thinking', 'Technical Communication', 'Project Management', 'Continuous Learning'],
          resources: ['Technical Documentation', 'Online Courses', 'Industry Publications', 'Professional Networks', 'Certification Programs']
        };
    }
  };

  const deptInfo = getDepartmentInfo();

  return (
    <div className="min-h-screen futuristic-bg p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Quiz
          </Button>
        </div>

        <Card className="quiz-card border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white text-center">
              {deptInfo.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-gray-300 text-lg leading-relaxed">
                {deptInfo.description}
              </p>
            </div>

            <div>
              <h3 className="text-white text-xl font-semibold mb-3">Key Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {deptInfo.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 border border-gray-600 rounded-lg p-3"
                  >
                    <span className="text-cyan-300 font-medium">• {skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white text-xl font-semibold mb-3">Learning Resources</h3>
              <div className="space-y-2">
                {deptInfo.resources.map((resource, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/30 border border-gray-700 rounded-lg p-3"
                  >
                    <span className="text-gray-300">📚 {resource}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center pt-4">
              <Button
                onClick={() => navigate('/')}
                className="bg-cyan-600 hover:bg-cyan-700 glow-effect"
              >
                Return to Quiz Setup
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Department;
