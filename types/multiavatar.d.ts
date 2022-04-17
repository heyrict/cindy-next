declare module '@multiavatar/multiavatar' {
  export interface MultiavatarVersion {
    part:
      | '01'
      | '02'
      | '03'
      | '04'
      | '05'
      | '06'
      | '07'
      | '08'
      | '09'
      | '10'
      | '11'
      | '12'
      | '13'
      | '14'
      | '15';
    theme: 'A' | 'B' | 'C';
  }
  export default (text: string, sansEnv?: bool, ver?: MultiavatarVersion) =>
    string;
}
