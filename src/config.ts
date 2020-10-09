interface IPlayerConfig {
  audioFileUrls: [string, string][]
}

export const playerConfig: IPlayerConfig = {
  audioFileUrls: [
    [
      'Kitkat Vocal',
      'https://public-test-audio.s3-eu-west-1.amazonaws.com/Kitkat_15sec.wav',
    ],
    [
      'Tequila Acoustic',
      'https://public-test-audio.s3-eu-west-1.amazonaws.com/test_backing_track_preview.mp3',
    ],
  ],
}
