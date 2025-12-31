<template>
  <div>
    <h1 class="text-2xl font-bold">Tailwind Color Palette</h1>
    <p class="text-slate mt-2">These are the custom colors defined in the library's Tailwind configuration.</p>

    <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <!-- White -->
      <div class="overflow-hidden rounded-lg shadow-sm">
        <div class="h-24 border-b border-slate-200 bg-white"></div>
        <div class="bg-gray-50 p-3">
          <p class="font-semibold">White</p>
          <p class="text-slate text-sm">#fff</p>
        </div>
      </div>

      <!-- Black -->
      <div class="overflow-hidden rounded-lg shadow-sm">
        <div class="h-24 border-b border-slate-200 bg-black"></div>
        <div class="bg-gray-50 p-3">
          <p class="font-semibold">Black</p>
          <p class="text-slate text-sm">#000</p>
        </div>
      </div>

      <!-- Midnight -->
      <div class="overflow-hidden rounded-lg shadow-sm">
        <div class="bg-midnight h-24 border-b border-slate-200"></div>
        <div class="bg-gray-50 p-3">
          <p class="font-semibold">Midnight</p>
          <p class="text-slate text-sm">#1e293b</p>
        </div>
      </div>

      <!-- Ocean -->
      <div class="overflow-hidden rounded-lg shadow-sm">
        <div class="bg-ocean h-24 border-b border-slate-400"></div>
        <div class="bg-gray-50 p-3">
          <p class="font-semibold">Ocean</p>
          <p class="text-slate text-sm">#0ea5e9</p>
        </div>
      </div>

      <!-- Coral -->
      <div class="overflow-hidden rounded-lg shadow-sm">
        <div class="bg-coral h-24 border-b border-slate-200"></div>
        <div class="bg-gray-50 p-3">
          <p class="font-semibold">Coral</p>
          <p class="text-slate text-sm">#f43f5e</p>
        </div>
      </div>

      <!-- Sunset -->
      <div class="overflow-hidden rounded-lg shadow-sm">
        <div class="bg-sunset h-24 border-b border-slate-200"></div>
        <div class="bg-gray-50 p-3">
          <p class="font-semibold">Sunset</p>
          <p class="text-slate text-sm">#f97316</p>
        </div>
      </div>

      <!-- Lavender -->
      <div class="overflow-hidden rounded-lg shadow-sm">
        <div class="bg-lavender h-24 border-b border-slate-200"></div>
        <div class="bg-gray-50 p-3">
          <p class="font-semibold">Lavender</p>
          <p class="text-slate text-sm">#a78bfa</p>
        </div>
      </div>

      <!-- Mint -->
      <div class="overflow-hidden rounded-lg shadow-sm">
        <div class="bg-mint h-24 border-b border-slate-200"></div>
        <div class="bg-gray-50 p-3">
          <p class="font-semibold">Mint</p>
          <p class="text-slate text-sm">#34d399</p>
        </div>
      </div>

      <!-- Honey -->
      <div class="overflow-hidden rounded-lg shadow-sm">
        <div class="bg-honey h-24 border-b border-slate-200"></div>
        <div class="bg-gray-50 p-3">
          <p class="font-semibold">Honey</p>
          <p class="text-slate text-sm">#fbbf24</p>
        </div>
      </div>

      <!-- Pewter -->
      <div class="overflow-hidden rounded-lg shadow-sm">
        <div class="bg-pewter h-24 border-b border-slate-200"></div>
        <div class="bg-gray-50 p-3">
          <p class="font-semibold">Pewter</p>
          <p class="text-slate text-sm">#64748b</p>
        </div>
      </div>
    </div>

    <!-- Text Colors Demo -->
    <h2 class="mt-12 text-xl font-bold">Text Colors</h2>
    <div class="mt-4 space-y-2 rounded-lg bg-white p-6 shadow-sm">
      <p class="bg-midnight inline-block rounded-sm px-2 text-white">White text (on midnight bg)</p>
      <p class="text-black">Black text</p>
      <p class="text-midnight">Midnight text</p>
      <p class="text-ocean">Ocean text</p>
      <p class="text-coral">Coral text</p>
      <p class="text-sunset">Sunset text</p>
      <p class="text-lavender">Lavender text</p>
      <p class="text-mint">Mint text</p>
      <p class="text-honey">Honey text</p>
      <p class="text-pewter">Pewter text</p>
    </div>

    <!-- Badge Demo -->
    <h2 class="mt-12 text-xl font-bold">Badge Examples</h2>
    <div class="mt-4 flex flex-wrap gap-3">
      <span class="badge bg-midnight text-white">Midnight Badge</span>
      <span class="badge bg-ocean text-white">Ocean Badge</span>
      <span class="badge bg-coral text-white">Coral Badge</span>
      <span class="badge bg-sunset text-white">Sunset Badge</span>
      <span class="badge bg-lavender text-white">Lavender Badge</span>
      <span class="badge bg-mint text-white">Mint Badge</span>
      <span class="badge bg-honey text-white">Honey Badge</span>
      <span class="badge bg-pewter text-white">Pewter Badge</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PlaygroundPagesColors',
})
</script>
