import * as settingReducer from 'reducers/setting';

export type SettingsButtonProps = {
  setTrueSettingsModal: () => void;
};

export type SettingsModalProps = typeof settingReducer.initialState;

export type SettingsFormProps = {} & Omit<
  typeof settingReducer.initialState,
  'settingsModal'
>;
