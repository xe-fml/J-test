import React from 'react';
import { Link } from 'react-router-dom';
import projects from '../data/projects.json';
import expertInsights from '../data/expertInsights.json';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Python数据分析训练
            </h1>
            <p className="text-xl mb-8">
              通过10个实践项目和100道考题，掌握数据分析核心技能
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/project/1" 
                className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors"
              >
                开始学习
              </Link>
              <Link 
                to="/expert-insights" 
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                专家洞察
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Project List Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            训练项目
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-blue-600">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link 
                      to={`/project/${project.id}`} 
                      className="text-blue-600 font-medium hover:underline"
                    >
                      查看详情
                    </Link>
                    <Link 
                      to={`/quiz/${project.id}`} 
                      className="bg-green-500 text-white font-medium py-2 px-4 rounded hover:bg-green-600 transition-colors"
                    >
                      开始测验
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Insights Overview */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            专家洞察
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                核心思维模式
              </h3>
              <ul className="space-y-3">
                {expertInsights.coreThinkingPatterns.map((pattern) => (
                  <li key={pattern.id} className="flex items-start">
                    <span className="bg-blue-100 text-blue-600 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                      {pattern.id}
                    </span>
                    <div>
                      <h4 className="font-bold text-gray-800">{pattern.title}</h4>
                      <p className="text-gray-600 text-sm">{pattern.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-center">
                <Link 
                  to="/expert-insights" 
                  className="text-blue-600 font-medium hover:underline"
                >
                  查看详细内容
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                争议话题
              </h3>
              <ul className="space-y-4">
                {expertInsights.controversialTopics.map((topic) => (
                  <li key={topic.id}>
                    <h4 className="font-bold text-gray-800">{topic.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{topic.description}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-center">
                <Link 
                  to="/expert-insights" 
                  className="text-blue-600 font-medium hover:underline"
                >
                  查看详细内容
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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

export default Home;