import React from 'react';
import { Link } from 'react-router-dom';
import expertInsights from '../data/expertInsights.json';

const ExpertInsights: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-blue-600">首页</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium">专家洞察</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">专家洞察</h1>
          <p className="text-lg">Python数据分析领域的核心思维模式和争议话题</p>
        </div>
      </div>

      {/* Core Thinking Patterns */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">核心思维模式</h2>
          <div className="space-y-8">
            {expertInsights.coreThinkingPatterns.map((pattern) => (
              <div key={pattern.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-600 font-bold rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                    {pattern.id}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{pattern.title}</h3>
                    <p className="text-gray-600 mb-4">{pattern.description}</p>
                    <ul className="space-y-2">
                      {pattern.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span className="text-gray-600">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controversial Topics */}
      <div className="container mx-auto px-4 py-12 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">争议话题</h2>
          <div className="space-y-8">
            {expertInsights.controversialTopics.map((topic) => (
              <div key={topic.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">{topic.title}</h3>
                <p className="text-gray-600 mb-6">{topic.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-blue-600">支持方观点</h4>
                    <ul className="space-y-2">
                      {topic.arguments['Python支持者']?.map((arg, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span className="text-gray-600">{arg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-orange-600">反对方观点</h4>
                    <ul className="space-y-2">
                      {topic.arguments['R支持者']?.map((arg, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-orange-600 mr-2">•</span>
                          <span className="text-gray-600">{arg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2 text-gray-800">当前状态</h4>
                  <p className="text-gray-600">{topic.currentStatus}</p>
                </div>
              </div>
            ))}
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

export default ExpertInsights;