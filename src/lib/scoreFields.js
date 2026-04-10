/**
 * Returns score field definitions with translated labels.
 * @param {(key: string) => string} t - translation function
 */
export function getScoreFields(t) {
  return [
    {
      key: 'arousal', color: '#FF8C42', min: -10, max: 10,
      question: t('scores.arousal.question'),
      tech: t('axis.arousal'),
      tooltip: t('scores.arousal.tooltip'),
    },
    {
      key: 'trance', color: '#7B68EE', min: -10, max: 10,
      question: t('scores.trance.question'),
      tech: t('axis.trance'),
      tooltip: t('scores.trance.tooltip'),
    },
    {
      key: 'pleasure', color: '#FF6B9D', min: -10, max: 10,
      question: t('scores.pleasure.question'),
      tech: t('axis.pleasure'),
      tooltip: t('scores.pleasure.tooltip'),
    },
    {
      key: 'dopamine', color: '#FFD166', min: -10, max: 10,
      question: t('scores.dopamine.question'),
      tech: t('axis.dopamine'),
      tooltip: t('scores.dopamine.tooltip'),
    },
    {
      key: 'endorphins', color: '#06D6A0', min: -10, max: 10,
      question: t('scores.endorphins.question'),
      tech: t('axis.endorphins'),
      tooltip: t('scores.endorphins.tooltip'),
    },
    {
      key: 'oxytocin', color: '#74B0FF', min: -10, max: 10,
      question: t('scores.oxytocin.question'),
      tech: t('axis.oxytocin'),
      tooltip: t('scores.oxytocin.tooltip'),
    },
    {
      key: 'energy', color: '#aaa', min: 0, max: 10,
      question: t('scores.energy.question'),
      tech: t('axis.energy'),
      tooltip: t('scores.energy.tooltip'),
    },
  ];
}

/** Backward-compatible static export (untranslated keys as values). */
export const SCORE_FIELDS = getScoreFields((key) => key);
