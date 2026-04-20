import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import quizzes from '../data/quizzes.json';

const Quiz: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || '1');
  const quizData = quizzes.find(q => q.projectId === projectId);

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">测验不存在</h1>
          <Link to="/" className="text-blue-600 hover:underline">返回首页</Link>
        </div>
      </div>
    );
  }

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(quizData.questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (answer: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let totalScore = 0;
    quizData.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        totalScore += question.score;
      }
    });
    setScore(totalScore);
    setShowResults(true);
  };

  const currentQuizQuestion = quizData.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-blue-600">首页</Link>
            <span className="text-gray-400">/</span>
            <Link to={`/project/${projectId}`} className="text-gray-600 hover:text-blue-600">{quizData.projectTitle}</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium">测验</span>
          </div>
        </div>
      </div>

      {/* Quiz Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{quizData.projectTitle} - 测验</h1>
          <p className="text-lg mb-6">共 {quizData.questions.length} 道题，满分 {quizData.questions.reduce((sum, q) => sum + q.score, 0)} 分</p>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2.5">
            <div 
              className="bg-white h-2.5 rounded-full" 
              style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
            ></div>
          </div>
          <div className="mt-2 text-sm">
            问题 {currentQuestion + 1} / {quizData.questions.length}
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {showResults ? (
            /* Results */
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">测验结果</h2>
              <div className="text-5xl font-bold mb-4 text-blue-600">{score} / {quizData.questions.reduce((sum, q) => sum + q.score, 0)}</div>
              <p className="text-lg mb-8">
                {score >= quizData.questions.reduce((sum, q) => sum + q.score, 0) * 0.7 
                  ? '恭喜你通过了测验！' 
                  : '继续努力，加油！'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {quizData.questions.map((question, index) => (
                  <div key={question.id} className={`p-4 rounded-lg ${answers[index] === question.correctAnswer ? 'bg-green-100' : 'bg-red-100'}`}>
                    <h4 className="font-bold mb-2">问题 {index + 1}</h4>
                    <p className="text-sm mb-2">{question.content.substring(0, 50)}...</p>
                    <p className={`font-medium ${answers[index] === question.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>
                      {answers[index] === question.correctAnswer ? '正确' : '错误'}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to={`/project/${projectId}`} 
                  className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  重新学习
                </Link>
                <Link 
                  to="/" 
                  className="bg-gray-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  返回首页
                </Link>
              </div>
            </div>
          ) : (
            /* Question */
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                问题 {currentQuestion + 1}: {currentQuizQuestion.content}
              </h3>
              {currentQuizQuestion.type === 'multiple-choice' && (
                <div className="space-y-3 mb-6">
                  {currentQuizQuestion.options?.map((option, index) => (
                    <div key={index}>
                      <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${answers[currentQuestion] === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                        <input
                          type="radio"
                          name={`question-${currentQuestion}`}
                          checked={answers[currentQuestion] === index}
                          onChange={() => handleAnswer(index)}
                          className="mr-3"
                        />
                        <span>{option}</span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {currentQuizQuestion.type === 'code-correction' && (
                <div className="mb-6">
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                    <pre className="text-green-400 font-mono text-sm">
                      <code>{currentQuizQuestion.content}</code>
                    </pre>
                  </div>
                  <input
                    type="text"
                    value={answers[currentQuestion] === -1 ? '' : currentQuizQuestion.options?.[answers[currentQuestion]] || ''}
                    onChange={(e) => {
                      // Find the index of the option that matches the input
                      const index = currentQuizQuestion.options?.findIndex(opt => opt === e.target.value) || -1;
                      handleAnswer(index);
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="输入修正后的代码"
                  />
                </div>
              )}
              <div className="flex justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  上一题
                </button>
                {currentQuestion === quizData.questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    提交测验
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    下一题
                  </button>
                )}
              </div>
            </div>
          )}
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

export default Quiz;