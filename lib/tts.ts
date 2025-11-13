interface TTSOptions {
  pitch?: number
  rate?: number
  volume?: number
  tone?: "calm" | "energetic"
}

export function speak(text: string, options: TTSOptions = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check browser support
    const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance || (window as any).webkitSpeechSynthesisUtterance

    if (!SpeechSynthesisUtterance) {
      reject(new Error("Text-to-Speech not supported"))
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    const { pitch = 1, rate = 1, volume = 1, tone = "calm" } = options

    utterance.pitch = tone === "energetic" ? pitch * 1.2 : pitch
    utterance.rate = tone === "energetic" ? rate * 1.2 : rate
    utterance.volume = volume

    utterance.onend = () => resolve()
    utterance.onerror = (event) => reject(new Error(event.error))

    window.speechSynthesis.speak(utterance)
  })
}

export function stopSpeech(): void {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel()
  }
}
