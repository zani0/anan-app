import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import YoutubePlayer from "react-native-youtube-iframe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/utils/api/api";

export default function CreateChildProfile() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showText, setShowText] = useState(false);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    search: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    if (step === 1) {
      setStep(step + 1);
      return;
    }

    if (step === 2 && !form.name) {
      Toast.show({ type: "error", text1: "Enter a name 🧒🏾" });
      return;
    }
    if (step === 3 && !form.age) {
      Toast.show({ type: "error", text1: "Select an age group 🎂" });
      return;
    }
    if (step === 4 && !form.gender) {
      Toast.show({ type: "error", text1: "Select a gender 🚻" });
      return;
    }
    if (step === 5 && !form.search) {
      Toast.show({ type: "error", text1: "Choose search setting 🔍" });
      return;
    }

    if (step < 5) {
      setStep(step + 1);
    } else {
      // Inside handleNext, step === 5
      try {
        const userData = await AsyncStorage.getItem("user");
        const token = await AsyncStorage.getItem("token");

        if (!userData || !token) {
          throw new Error("Missing user or token in storage");
        }

        let user;
        try {
          user = JSON.parse(userData);
          if (!user?.id) throw new Error("User ID missing");
        } catch (e) {
          throw new Error("Invalid user data");
        }

        const response = await fetch(
          "https://anansesem.onrender.com/api/v1/profile/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              bio: {
                nickName: form.name, 
                avatar: `https://ui-avatars.com/api/?name=${form.name}`,
                fullName: form.name,
                dateOfBirth: "2023-05-23T00:00:00.000Z", 
                gender: form.gender.toUpperCase(), 
                preferredLanguage: "ENGLISH", 
                readingLevel: "Advanced", 
              },
              interests: {
                favoriteStoryGenre: "MYSTERY", 
                favoriteCharacter: "Monkey D. Luffy",
                creativePreference: "READING",
                favoriteColor: "Black",
              },
              storyPreferences: {
                mood: "FUNNY",
                themeOfInterest: "MAGIC",
              },
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        Toast.show({
          type: "success",
          text1: "Profile created!",
          text2: "You're all set 🎉",
        });

        setTimeout(() => {
          router.replace("/preferences");
        }, 1500);
      } catch (err: any) {
        Toast.show({
          type: "error",
          text1: "Failed to create profile",
          text2: err.message,
        });
      }
    }
  };

  // const handleNext = async () => {
  //   if (step === 1) {
  //     setStep(step + 1);
  //     return;
  //   }

  //   if (step === 2 && !form.name) {
  //     Toast.show({ type: "error", text1: "Enter a name 🧒🏾" });
  //     return;
  //   }
  //   if (step === 3 && !form.age) {
  //     Toast.show({ type: "error", text1: "Select an age group 🎂" });
  //     return;
  //   }
  //   if (step === 4 && !form.gender) {
  //     Toast.show({ type: "error", text1: "Select a gender 🚻" });
  //     return;
  //   }
  //   if (step === 5 && !form.search) {
  //     Toast.show({ type: "error", text1: "Choose search setting 🔍" });
  //     return;
  //   }

  //   if (step < 5) {
  //     setStep(step + 1);
  //   } else {
  //     // 🚨 TEMPORARILY SKIPPING API
  //     router.replace("/(onboarding)/preferences/index");
  //   }
  // };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text className="text-[#60178b] text-[18px] font-poppins text-center mb-3">
              Watch this video to learn more
            </Text>

            {showText ? (
              <>
                <View className="bg-white p-4 rounded-xl">
                  <Text className="text-sm text-gray-700">
                    Welcome to the Anansesem experience! This short video is for
                    you, the parent. We want to ensure your child is safe while
                    having fun. Please take a moment to learn how to set up the
                    best experience. Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Ducimus molestiae, quas voluptatibus sed,
                    itaque quos qui ad a id sit at quae sequi nostrum, repellat
                    dicta reprehenderit ab voluptates sint.
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setShowText(false)}>
                  <Text className="text-sm text-[#60178b] underline text-center mt-4">
                    Watch video instead
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <YoutubePlayer
                  height={200}
                  play={false}
                  videoId={"XqZsoesa55w"}
                />
                <TouchableOpacity onPress={() => setShowText(true)}>
                  <Text className="text-sm text-[#60178b] underline text-center mt-4">
                    Read video text instead
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </>
        );

      case 2:
        return (
          <>
            <Text className="text-[#60178b] text-[18px] font-poppins text-center mb-3">
              What’s your child’s name?
            </Text>
            <TextInput
              value={form.name}
              onChangeText={(text) => handleChange("name", text)}
              placeholder="Name here"
              placeholderTextColor="#aaa"
              className="bg-transparent border-b border-dotted border-[#60178b] px-4 py-3 font-poppins text-gray-600 text-center w-full mb-2"
            />
          </>
        );
      case 3:
        const ageGroups = [
          {
            label: "Pre-school",
            value: "preschool",
            description: "Age 4 and under",
            image: require("@/assets/images/preschool.png"),
          },
          {
            label: "Younger",
            value: "younger",
            description: "Ages 5-8",
            image: require("@/assets/images/younger.png"),
          },
          {
            label: "Older",
            value: "older",
            description: "Ages 9-12",
            image: require("@/assets/images/older.png"),
          },
        ];
        return (
          <>
            <Text className="text-[#60178b] font-poppins text-lg text-center mb-6">
              How old is your child?
            </Text>
            <View className="space-y-4">
              {ageGroups.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  onPress={() => handleChange("age", item.value)}
                  className={`flex-row items-center bg-white rounded-xl p-4 mb-4 ${
                    form.age === item.value
                      ? "border-4 border-[#D0EE30]"
                      : "border border-transparent"
                  }`}
                >
                  <Image
                    source={item.image}
                    className="w-14 h-14 mr-4"
                    resizeMode="contain"
                  />
                  <View>
                    <Text className="text-base font-poppinsBold text-[#60178b]">
                      {item.label}
                    </Text>
                    <Text className="text-sm text-gray-500">
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        );
      case 4:
        const genderOptions = [
          {
            label: "Boy",
            value: "boy",
            image: require("@/assets/images/boy-gender.png"),
          },
          {
            label: "Girl",
            value: "girl",
            image: require("@/assets/images/girl-gender.png"),
          },
          {
            label: "I'd rather not say",
            value: "unspecified",
            image: require("@/assets/images/no-gender.png"),
          },
        ];

        return (
          <>
            <Text className="text-[#60178b] font-poppins text-lg text-center mb-6">
              What’s your child’s gender?
            </Text>

            {/* Row with Boy and Girl */}
            <View className="flex-row justify-between mb-4">
              {genderOptions.slice(0, 2).map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleChange("gender", option.value)}
                  className={`w-[48%] items-center rounded-xl p-3 ${
                    form.gender === option.value
                      ? "border-4 border-[#D0EE30]"
                      : "border border-white"
                  } bg-white`}
                >
                  <Image
                    source={option.image}
                    className="w-16 h-16 rounded-full mb-2"
                    resizeMode="contain"
                  />
                  <Text className="text-sm font-poppins text-center text-[#60178b]">
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Row with Unspecified */}
            <View className="items-center">
              <TouchableOpacity
                onPress={() => handleChange("gender", "unspecified")}
                className={`w-[80%] items-center rounded-xl p-3 ${
                  form.gender === "unspecified"
                    ? "border-4 border-[#D0EE30]"
                    : "border border-white"
                } bg-white`}
              >
                <Image
                  source={genderOptions[2].image}
                  className="w-16 h-16 rounded-full mb-2"
                  resizeMode="contain"
                />
                <Text className="text-sm font-poppins text-center text-[#60178b]">
                  {genderOptions[2].label}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        );

      case 5:
        return (
          <>
            <Text className="text-[#60178b] font-poppins text-lg text-center mb-6">
              Do you want search to be on or off?
            </Text>
            <Text className="text-gray-700 font-poppins text-base text-center mb-4">
              You can always change this setting later in parental controls.
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Adipisci, asperiores aliquid. Placeat molestias distinctio neque,
              asperiores, nobis blanditiis eaque repudiandae ipsum velit atque,
              fuga odit ducimus commodi quod vitae sit!
            </Text>
            <View className="space-y-4">
              <TouchableOpacity
                onPress={() => handleChange("search", "off")}
                className={`bg-[#cfee30] rounded-xl py-3 px-4 items-center mb-2 ${
                  form.search === "off"
                    ? "border-4 border-[#60178b]"
                    : "border border-transparent"
                }`}
              >
                <Text className="font-poppinsBold text-[#60178b]">
                  Turn Search Off
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleChange("search", "on")}
                className={`bg-[#cfee30] rounded-xl py-3 px-4 items-center ${
                  form.search === "on"
                    ? "border-4 border-[#60178b]"
                    : "border border-transparent"
                }`}
              >
                <Text className="font-poppinsBold text-[#60178b]">
                  Turn Search On
                </Text>
              </TouchableOpacity>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-[#60178b] px-6 justify-center items-center">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require("@/assets/images/spider-web-1.png")}
          className="w-[150px] h-[120px] absolute top-[-20] right-[-30]"
        />
        <Image
          source={require("@/assets/images/spider-web-2.png")}
          className="w-[170px] h-[80px] absolute bottom-0 left-0"
        />

        <Text className="text-[30px] font-caprasimo text-[#D0EE30] text-center mb-4">
          Create a profile for your child
        </Text>
        <Text className="font-poppins text-white text-base text-center mb-8">
          We only use this to curate the kind of videos suitable for your child
        </Text>

        <View className="bg-white p-6 rounded-2xl w-full space-y-4">
          {renderStep()}

          <TouchableOpacity
            onPress={handleNext}
            className="bg-[#D0EE30] py-3 mt-6 rounded-xl"
          >
            <Text className="text-[#60178b] text-center font-poppinsBold text-[18px]">
              {step < 5 ? "Next" : "Finish"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Toast />
    </View>
  );
}
