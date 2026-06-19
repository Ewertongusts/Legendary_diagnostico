<script setup lang="ts">
import { useDiagnostic } from '~/composables/useDiagnostic'

const {
  step,
  currentIndex,
  answers,
  lead,
  currentQuestion,
  categoryScores,
  overallScore,
  maturityLevel,
  weakAreas,
  strongAreas,
  savingsText,
  whatsappUrl,
  start,
  answer,
  back,
  submitLead,
  completeLoading,
  restart
} = useDiagnostic()
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Ambient glows -->
    <div class="bg-glow"></div>
    <!-- Grid overlay lines -->
    <div class="grid-lines"></div>

    <!-- Main Wrapper -->
    <div class="relative z-10 max-w-[760px] mx-auto px-[22px] py-[28px] pb-[60px] min-h-screen flex flex-col">
      <!-- BRAND / HEADER -->
      <div class="flex items-center justify-between mb-[30px]">
        <div class="flex items-center gap-[11px] font-space font-bold text-[19px] tracking-[0.5px] text-brand-text">
          <img 
            class="w-[30px] h-[30px] flex-shrink-0" 
            src="/logo.png" 
            alt="Legendary Hub"
          >
          <span>LEGENDARY <span class="bg-gradient-to-br from-[#3B6EF6] to-[#5B8CFF] text-white text-[11px] font-bold px-2 py-[3px] rounded-[6px] tracking-wider ml-1">HUB</span></span>
        </div>
        <span class="text-[11px] text-brand-muted2 tracking-[3px] font-semibold">DIAGNÓSTICO</span>
      </div>

      <!-- MAIN APP SCREENS -->
      <main class="flex-1 flex flex-col justify-center">
        <!-- Intro Screen -->
        <IntroScreen 
          v-if="step === 'intro'" 
          :onStart="start" 
        />

        <!-- Quiz Screen -->
        <QuizScreen 
          v-else-if="step === 'quiz'" 
          :currentIndex="currentIndex"
          :currentQuestion="currentQuestion"
          :selectedAnswerIndex="answers[currentIndex]?.i"
          :onAnswer="answer"
          :onBack="back"
        />

        <!-- Lead Screen -->
        <LeadScreen 
          v-else-if="step === 'lead'" 
          :onSubmit="submitLead" 
        />

        <!-- Loading Screen -->
        <LoadingScreen 
          v-else-if="step === 'loading'" 
          :onComplete="completeLoading"
        />

        <!-- Results Screen -->
        <ResultsScreen 
          v-else-if="step === 'results'" 
          :lead="lead"
          :categoryScores="categoryScores"
          :overallScore="overallScore"
          :maturityLevel="maturityLevel"
          :weakAreas="weakAreas"
          :strongAreas="strongAreas"
          :savingsText="savingsText"
          :whatsappUrl="whatsappUrl"
          :onRestart="restart"
        />
      </main>
    </div>
  </div>
</template>
