import * as settingReducer from 'reducers/setting';

export type SettingsButtonProps = {
  setTrueSettingsModal: () => void;
};

export type SettingsModalProps = {
  setFalseSettingsModal: () => void;
  setState: (
    state: {
      [key in keyof typeof settingReducer.initialState]?: typeof settingReducer.initialState[key]
    },
  ) => void;
} & typeof settingReducer.initialState;

export type SettingsFormProps = {
} & Omit<typeof settingReducer.initialState, 'settingsModal'>;
