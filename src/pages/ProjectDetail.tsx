import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import projects from '../data/projects.json';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || '1');
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">项目不存在</h1>
          <Link to="/" className="text-blue-600 hover:underline">返回首页</Link>
        </div>
      </div>
    );
  }

  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-blue-600">首页</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium">{project.title}</span>
          </div>
        </div>
      </div>

      {/* Project Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-3">
            {project.learningObjectives.map((objective, index) => (
              <span key={index} className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm">
                {objective}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Materials */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">学习材料</h2>

          {/* Step Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4">
              {project.materials.map((material) => (
                <button
                  key={material.step}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeStep === material.step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  onClick={() => setActiveStep(material.step)}
                >
                  步骤 {material.step}: {material.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Content */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {project.materials.map((material) => (
              <div key={material.step} className={activeStep === material.step ? 'block' : 'hidden'}>
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  步骤 {material.step}: {material.title}
                </h3>
                <p className="text-gray-600 mb-6">{material.content}</p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 font-mono text-sm">
                    <code>{material.code}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>

          {/* Practice Area */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">实践区域</h3>
            <p className="text-gray-600 mb-6">
              尝试使用pandas完成以下任务：
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-6">
              <pre className="text-green-400 font-mono text-sm">
                <code># 在此处编写你的代码
import pandas as pd

# 读取数据
# 处理数据
# 分析数据
# 可视化结果</code>
              </pre>
            </div>
            <div className="flex justify-end">
              <Link 
                to={`/quiz/${project.id}`} 
                className="bg-green-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-600 transition-colors"
              >
                开始测验
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">Python数据分析训练平台</p>
          <p className="text-gray-400 text-sm">
            © 2026 版权所有
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetail;