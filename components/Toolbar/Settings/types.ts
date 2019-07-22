import * as settingReducer from 'reducers/setting';
import { ArgumentsType } from 'utilities';

export type SettingsButtonProps = {
  setTrueSettingsModal: () => void;
};

export type SettingsModalProps = {
  setFalseSettingsModal: () => void;
  setState: (
    ...args: ArgumentsType<typeof settingReducer.actions.setState>
  ) => void;
} & typeof settingReducer.initialState;

export type SettingsFormProps = {} & Omit<
  typeof settingReducer.initialState,
  'settingsModal'
>;
