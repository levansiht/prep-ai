import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AboutPage = () => {
  return (
    <>
      <section className={"card-cta mb-10"}>
        <div className={"flex flex-col gap-6 max-w-xl"}>
          <h2>About DevPrep AI</h2>
          <p className={"text-lg"}>
            DevPrep AI is your ultimate interview preparation companion,
            designed to help developers master technical interviews through
            AI-powered practice and personalized feedback.
          </p>
        </div>
        <Image
          src={"/robot.png"}
          alt={"AI Assistant"}
          width={300}
          height={300}
          className={"max-sm:hidden"}
        />
      </section>

      <section className="flex flex-col gap-8 mb-10">
        <h3>Our Mission</h3>
        <div className="dark-gradient rounded-2xl p-8">
          <p className="text-lg mb-6">
            At DevPrep AI, we believe that every developer deserves access to
            high-quality interview preparation resources. Our mission is to
            level the playing field by providing personalized, AI-powered
            interview practice that adapts to your skill level and career goals.
          </p>
          <p className="text-lg">
            We&apos;re committed to helping developers build confidence, improve
            their technical communication skills, and showcase their abilities
            in real-world interview scenarios.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-8 mb-10">
        <h3>Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="blue-gradient-dark rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary-200 rounded-full p-3">
                <Image
                  src="/robot.png"
                  alt="AI Interviews"
                  width={24}
                  height={24}
                />
              </div>
              <h4 className="text-xl font-semibold">AI-Powered Interviews</h4>
            </div>
            <p>
              Practice with realistic interview scenarios tailored to different
              technologies and role levels.
            </p>
          </div>

          <div className="blue-gradient-dark rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary-200 rounded-full p-3">
                <Image src="/file.svg" alt="Feedback" width={24} height={24} />
              </div>
              <h4 className="text-xl font-semibold">Instant Feedback</h4>
            </div>
            <p>
              Receive detailed feedback on your answers with specific
              suggestions for improvement.
            </p>
          </div>

          <div className="blue-gradient-dark rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary-200 rounded-full p-3">
                <Image
                  src="/tech.svg"
                  alt="Technologies"
                  width={24}
                  height={24}
                />
              </div>
              <h4 className="text-xl font-semibold">Multiple Technologies</h4>
            </div>
            <p>
              Practice interviews across various technologies including React,
              Node.js, Python, and more.
            </p>
          </div>

          <div className="blue-gradient-dark rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary-200 rounded-full p-3">
                <Image
                  src="/profile.svg"
                  alt="Progress"
                  width={24}
                  height={24}
                />
              </div>
              <h4 className="text-xl font-semibold">Track Progress</h4>
            </div>
            <p>
              Monitor your improvement over time with detailed progress tracking
              and performance metrics.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8 mb-10">
        <h3>How It Works</h3>
        <div className="blue-gradient-dark rounded-2xl p-8">
          <ol className="flex flex-col gap-6 list-decimal">
            <li className="text-light-100 text-lg">
              <span className="font-semibold">Choose your interview topic</span>{" "}
              - Select from various technologies, roles, and difficulty levels.
            </li>
            <li className="text-light-100 text-lg">
              <span className="font-semibold">Practice with AI</span> - Engage
              in realistic interview scenarios with our AI interviewer.
            </li>
            <li className="text-light-100 text-lg">
              <span className="font-semibold">Receive feedback</span> - Get
              instant, detailed feedback on your performance.
            </li>
            <li className="text-light-100 text-lg">
              <span className="font-semibold">Improve and repeat</span> - Track
              your progress and practice until you&apos;re interview-ready.
            </li>
          </ol>
        </div>
      </section>

      <section className="flex flex-col items-center gap-6 dark-gradient rounded-2xl p-8 text-center">
        <h3>Ready to ace your next interview?</h3>
        <p className="text-lg max-w-2xl">
          Start practicing with DevPrep AI today and build the confidence you
          need to succeed in your technical interviews.
        </p>
        <div className="flex gap-4 mt-4">
          <Button asChild className={"btn-primary"}>
            <Link href={"/interview"}>Start an Interview</Link>
          </Button>
          <Button asChild className={"btn-secondary"}>
            <Link href={"/sign-up"}>Create Account</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
