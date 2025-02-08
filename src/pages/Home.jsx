import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

const HomePage = () => {
  const [startQuiz, setStartQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const[selectedAnswer, setSelectAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Function to shuffle options randomly
  const shuffleOptions = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=10&type=multiple"
        );
        const data = await response.json();
        console.log(data.results);
        console.log(data.results.map((q) => q.category));

        const formattedQuestions = data.results.map((q) => ({
          question: q.question,
          difficulty: q.difficulty,
          category: q.category,
          options: shuffleOptions([...q.incorrect_answers, q.correct_answer]),
          correctAnswer: q.correct_answer,
        }));

        setQuestions(formattedQuestions);
      } catch (error) {
        console.log("Error fetching the data", error);
      } finally {
        setLoading(false);
      }
    };

    if (startQuiz) fetchQuestions();
  }, [startQuiz]);
  const handleAnswerClick = (answer) =>{
    setSelectAnswer(answer);
    setIsAnswered(true);
  }
  const handleNextQuestion = ()=>{
     setSelectAnswer(null);
     setIsAnswered(false);
     setQuestionIndex(prev=>prev+1);
  }


  return (
    <div className="bg-black min-h-screen flex items-center justify-center text-white flex-col space-y-1">
      {/* If quiz hasn't started, show the input and play button */}
      {!startQuiz ? (
        <div className="flex flex-col space-y-4 mb-5">
          <input
            type="text"
            placeholder="Input Player Name"
            className="border-2 border-gray-300 rounded-lg p-2 text-center"
          />
          <button
            onClick={() => setStartQuiz(true)}
            className="border-gray-400 p-5 border-2 rounded-lg mx-auto py-1 hover:bg-sky-700"
          >
            Play
          </button>
        </div>
      ) : (
        // Quiz screen: Shows the questions when quiz starts
        <div className="w-3/4 max-w-2xl p-6 bg-gray-800 rounded-lg relative min-h-screen flex flex-col justify-center items-center">
          {/* Back button to return to the home screen */}
          <button
            onClick={() => setStartQuiz(false)}
            className="absolute top-4 left-4 bg-gray-600 rounded-full p-2"
          >
            <ArrowLeft size={24} />
          </button>

          {loading ? (
            <p>Loading....</p>
          ) : questions.length > 0 ? (
            <div className="w-3/4 p-5 bg-gray-600 text-center rounded-3xl">
              <h2 className="text-sm mb-5 text-center">
                Category: {questions[questionIndex].category} <br />
                difficulty: {questions[questionIndex].difficulty}
              </h2>
              <h2 className="text-lg">{questions[questionIndex].question}</h2>
              <div className="mt-4 space-y-1.5">
                {questions[questionIndex].options.map((answer, index) => (
                  <button
                    key={index}
                    className={`block w-full p-2 rounded-xl  ${
                      isAnswered
                        ? answer === questions[questionIndex].correctAnswer
                          ? "bg-green-500"
                          : selectedAnswer === answer
                          ? "bg-red-500"
                          : "bg-gray-700"
                        : "bg-gray-700 hover:bg-gray-400"
                    }`}
                    onClick={() => handleAnswerClick(answer)}
        
                  >
                    {answer}
                  </button>
                ))}
              </div>

              {/* Next button */}
              {questionIndex < 9 ? (
                <button
                  onClick={() => handleNextQuestion()}
                  className="mt-4 bg-sky-700 font-semibold rounded-lg p-2 px-4"
                >
                  Next
                </button>
              ) : (
                <p className="mt-4">Quiz completed!</p>
              )}
            </div>
          ) : (
            <p>No questions found!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
