import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Star } from "lucide-react-native";
import Checkbox from "expo-checkbox";

const quizData = [
  {
    question: "What did the first hunter find?",
    options: ["A lion", "A bird", "A treasure", "A rabbit"],
  },
  {
    question: "Where did the hunters go?",
    options: ["To the sea", "To the forest", "To the city", "To the mountain"],
  },
];

export default function Video() {
  const [playVideo, setPlayVideo] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [rating, setRating] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const playerRef = useRef(null);

  const renderStars = () => (
    <View className="flex-row mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => setRating(star)} className="mx-1">
          <Star
            size={24}
            color={star <= rating ? "#facc15" : "#e5e7eb"}
            fill={star <= rating ? "#facc15" : "none"}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const handleCheckboxSelect = (optionIndex: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentSlide] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    console.log("Submitted answers:", answers);
    setShowQuiz(false);
    setCurrentSlide(0);
  };

  return (
    <View className="w-full relative">
      {/* Thumbnail or Player */}
      {!playVideo ? (
        <TouchableOpacity
          onPress={() => setPlayVideo(true)}
          className="rounded-2xl overflow-hidden my-2"
        >
          <View className="relative w-full h-56">
            <Image
              source={require("@/assets/images/cartoon.jpg")}
              className="w-full h-full"
              resizeMode="cover"
            />
            <View className="absolute inset-0 items-center justify-center">
              <View className="w-12 h-12 bg-lime-300 rounded-full items-center justify-center">
                <Text className="text-black font-bold text-xl">▶</Text>
              </View>
              <Text className="text-white mt-2 font-medium font-poppins">Play Video</Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <>
          <YoutubePlayer
            ref={playerRef}
            height={220}
            play={true}
            videoId={"XqZsoesa55w"}
            onChangeState={(state: string) => {
              if (state === "ended") {
                setVideoEnded(true);
              }
            }}
            initialPlayerParams={{
              controls: 2,
              modestbranding: true,
              rel: false,
              showinfo: false,
            }}
          />
        </>
      )}

      {/* Start Quiz Overlay */}
      {videoEnded && !showQuiz && (
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-purple-800/60 items-center justify-center rounded-2xl">
          <TouchableOpacity
            onPress={() => setShowQuiz(true)}
            className="bg-white px-6 py-3 rounded-full"
          >
            <Text className="text-purple-800 font-bold text-lg">Start Quiz</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Quiz Overlay */}
      {showQuiz && (
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-purple-800/70 px-6 py-8 rounded-2xl justify-center">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="text-white text-2xl font-poppinsBold mb-4 text-center">
              Quiz Time
            </Text>

            <Text className="text-white text-lg font-bold mb-2">
              Question {currentSlide + 1}
            </Text>

            <Text className="text-white text-base font-poppins mb-4">
              {quizData[currentSlide].question}
            </Text>

            <View className="flex-row flex-wrap gap-4 justify-between mb-6">
              {quizData[currentSlide].options.map((opt, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleCheckboxSelect(index)}
                  className="w-[48%] bg-white rounded-xl p-3 flex-row items-center gap-2"
                >
                  <Checkbox
                    value={answers[currentSlide] === index}
                    onValueChange={() => handleCheckboxSelect(index)}
                    color="#9333ea"
                  />
                  <Text className="text-purple-900 font-poppins">{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Buttons */}
            <View className="flex-row justify-between">
              <TouchableOpacity onPress={() => setShowQuiz(false)}>
                <Text className="text-white underline">Skip</Text>
              </TouchableOpacity>

              {currentSlide === quizData.length - 1 ? (
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={answers.length < quizData.length}
                  className={`bg-white px-4 py-2 rounded-full ${
                    answers.length < quizData.length ? "opacity-50" : ""
                  }`}
                >
                  <Text className="text-purple-900 font-semibold">Submit</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setCurrentSlide((prev) => prev + 1)}
                  className="bg-white px-4 py-2 rounded-full"
                >
                  <Text className="text-purple-900 font-semibold">Next</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      )}

      {/* Text & Star Rating */}
      <View className="w-full px-4 py-3">
        <Text className="text-purple-900 font-poppinsBold text-[23px]">
          The three village hunters
        </Text>
        <Text className="text-purple-900 text-md font-poppins">
          Story by Nutifafa Tsikata
        </Text>
        {renderStars()}
      </View>
    </View>
  );
}
