import React from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PlaceIcon from "@material-ui/icons/Place";
import NotesIcon from "@material-ui/icons/Notes";

// ----------ここで渡されているデータ
interface TestScheduleMetadata {
  title: string;
  place: string;
  description: string;
}
interface TestScheduleModel<T = TestScheduleMetadata> {
  date: Date;
  schedules: Array<T>;
}
const testToday: Date = new Date();
const testADay: TestScheduleModel = {
  date: testToday,
  schedules: [],
};
// ----------

export const AddScheduleDialog = () => {
  return (
    <div
      role="presentation"
      className="MuiDialog-root"
      style={{ position: "fixed", zIndex: 1300, inset: "0px" }}
    >
      <div
        className="MuiBackdrop-root"
        aria-hidden="true"
        style={{
          opacity: 1,
          transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        }}
      ></div>
      <div tabIndex={0} data-test="sentinelStart"></div>
      <div
        className="MuiDialog-container MuiDialog-scrollPaper"
        role="none presentation"
        tabIndex={-1}
        style={{
          opacity: 1,
          transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        }}
      >
        <div
          className="MuiPaper-root MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthXs MuiDialog-paperFullWidth MuiPaper-elevation24 MuiPaper-rounded"
          role="dialog"
        >
          <div className="MuiDialogActions-root MuiDialogActions-spacing">
            <div className="src-components-AddScheduleDialog-style__closeButton--2v8XJ">
              <button
                className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall"
                tabIndex={0}
                type="button"
                title="閉じる"
              >
                <span className="MuiIconButton-label"></span>
                <span className="MuiTouchRipple-root"></span>
              </button>
            </div>
          </div>
          <div className="MuiDialogContent-root">
            <div className="MuiInputBase-root MuiInput-root jss1000 MuiInput-underline MuiInputBase-fullWidth MuiInput-fullWidth">
              <input
                placeholder="タイトルと日時を追加"
                type="text"
                className="MuiInputBase-input MuiInput-input"
                // valueはinput のstateを管理するようになった時に表示させるようにする
              />
            </div>
            <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-1 MuiGrid-align-items-xs-center MuiGrid-justify-xs-space-between">
              <div className="MuiGrid-root MuiGrid-item">
                <AccessTimeIcon />
              </div>
              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-10">
                {/* format='YYYY年M月D日'を本当は↓のdivに入れたいのだができなかったのでいったん放置 */}
                <div
                  className="MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth"
                  style={{ margin: "4px 0px" }}
                >
                  <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-fullWidth MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl">
                    <input
                      className="MuiInputBase-input MuiInput-input"
                      aria-invalid="false"
                      readOnly
                      type="text"
                      // valueの値は選んだ日付に応じて変わるようにする必要あり
                      value="2021年7月10日"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-1 MuiGrid-align-items-xs-center MuiGrid-justify-xs-space-between">
              <div className="MuiGrid-root MuiGrid-item">
                <PlaceIcon />
              </div>
              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-10">
                <div
                  className="MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth"
                  style={{ margin: "4px 0px" }}
                >
                  <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-fullWidth MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl">
                    <input
                      className="MuiInputBase-input MuiInput-input"
                      aria-invalid="false"
                      placeholder="場所を追加"
                      type="text"
                      // valueは状態をもつようにしてからおくようにする。
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-1 MuiGrid-align-items-xs-center MuiGrid-justify-xs-space-between">
              <div className="MuiGrid-root MuiGrid-item">
                <NotesIcon />
              </div>
              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-10">
                <div
                  className="MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth"
                  style={{ margin: "4px 0px" }}
                >
                  <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-fullWidth MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl">
                    <input
                      className="MuiInputBase-input MuiInput-input"
                      aria-invalid="false"
                      placeholder="説明を追加"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="MuiDialogActions-root MuiDialogActions-spacing">
            <button
              className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary"
              tabIndex={0}
              type="button"
            >
              <span className="MuiButton-label">保存</span>
              <span className="MuiTouchRipple-root"></span>
            </button>
          </div>
        </div>
      </div>
      <div tabIndex={0} data-test="sentinelEnd"></div>
    </div>
  );
};
