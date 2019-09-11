import ProjectHelper from 'app/util/helpers';

export default class StudyModeText {
  constructor(smData) {
    this.data = smData;
    this.modes = [];
    this.setModes();
    this.smByStartDate = ProjectHelper.Group(this.modes, 'start'); // group by month
    this.sentence = this.createSentence();
  }

  setModes() {
    this.data.map(sm => {
      sm.startDates.map(sd => {
        this.modes.push({
          duration: sm.duration,
          mode: sm.mode.replace(
            /(thick|thin|compressed)-sandwich/g,
            'with placement'
          ),
          start: sd.name,
        });
      });
    });
  }

  createSentence() {
    return Object.keys(this.smByStartDate)
      .map((startDate, i) => {
        const prefix =
          i === 0
            ? 'This course can be studied '
            : 'Or this course can be studied ';
        const smPhrase = this.smByStartDate[startDate].map(
          sm => `${sm.duration} ${sm.mode}`
        );
        const str_smPhrase = `${prefix +
          ProjectHelper.ArrayToSentence(
            smPhrase,
            'or'
          )}, starting in ${startDate}.`;
        return str_smPhrase;
      })
      .join(' ');
  }
}
