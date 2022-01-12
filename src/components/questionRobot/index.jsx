import React, { useEffect, useState, useRef } from "react";
import * as styles from "./index.module.less";
import milvus from "../../images/milvus_logo.svg";
import { getFaq } from "../../http";
import WelcomBlock from "./welcomBlock";
import AnswerBlock from "./answerBlock";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";

const BirdIcon = props => {
  return (
    <SvgIcon
      viewBox="0 0 75 75"
      // style={{ width: "64px", height: "64px", fill: "white" }}
      {...props}
    >
      <clipPath id="a">
        <rect height="75" rx="37.5" width="75" />
      </clipPath>
      <g clipPath="url(#a)">
        <rect fill="#4fc4f9" height="75" rx="37.5" width="75" />
        <path
          clipRule="evenodd"
          d="m40.3852 10.321c3.7471-1.22883 7.7458 1.1983 9.1416 5.1008l.0001.0004c.0264.0738.0522.1491.0772.2264l.9716 3.0149-1.831.5901-.9707-3.0121c-.0183-.0567-.0378-.1135-.0586-.1718-1.1227-3.1391-4.1807-4.757-6.7307-3.9207l-15.2211 4.9934c-.0001 0-.0001 0-.0002 0-2.5822.8476-4.0935 4.0345-3.0619 7.2683l.0002.0007c-.0003-.001.0417.1259.1165.3516.0777.2345.1907.5759.3283.9913.2677.8081.6241 1.8838.9805 2.9596l.1827.5514c.6454 1.9484 1.2445 3.7566 1.2496 3.7727l-1.8332.5833c.0003.001-.0417-.126-.1166-.3519-.0777-.2346-.1907-.5758-.3282-.991-.2677-.8081-.6241-1.8838-.9805-2.9596l-.1839-.5553c-.6401-1.9321-1.2342-3.7252-1.2482-3.7682-1.2809-4.0155.499-8.4349 4.295-9.6808h.0001l15.2213-4.9935z"
          fill="#65f8c3"
          fillRule="evenodd"
        />
        <path
          d="m48.8803 27.0704c3.2837 0 5.9457-2.662 5.9457-5.9457 0-3.2838-2.662-5.9457-5.9457-5.9457s-5.9457 2.6619-5.9457 5.9457c0 3.2837 2.662 5.9457 5.9457 5.9457z"
          fill="#65f8c3"
        />
        <path
          d="m40.5189 64.703c-.1549.6735-.2824 1.349-.3948 2.0225-.222 1.332-.377 2.6809-.4752 4.029-.1918 2.6838-.1823 5.3779.0274 8.0608l.0737.9418.6726.2985c.5828.2626 1.1817.5016 1.7778.7397l.8965.342.9144.3211c.6188.2022 1.2376.3996 1.8724.5659.6404.1795 1.2904.324 1.946.4336-.4525-.4874-.9305-.9522-1.4302-1.3905-.4913-.4384-.9957-.8474-1.5049-1.2536l-.7718-.5895-.7822-.5706c-.5271-.3665-1.0561-.7349-1.5964-1.0806l.7396 1.2431c.2097-2.6828.2182-5.377.0265-8.0608-.0973-1.3376-.256-2.6809-.4752-4.029-.1124-.6735-.2399-1.3489-.3967-2.0225-.1502-.6839-.3373-1.3594-.5602-2.0225-.2211.6631-.4081 1.3376-.5593 2.0216z"
          fill="#000"
        />
        <path
          d="m30.3885 65.1553c-.1568.6736-.2844 1.349-.3968 2.0226-.2201 1.3641-.3769 2.6989-.4733 4.0611-.0963 1.3612-.1435 2.6951-.1369 4.0582.0066 1.3641.0557 2.7122.1662 4.0611l.0765.9438.6726.2937c.5857.2627 1.1837.5017 1.7807.7416l.8965.3391.9145.3212c.6168.2022 1.2356.3996 1.8723.5687.6405.1786 1.2885.3231 1.9441.4336-.4534-.4865-.9314-.9494-1.4331-1.3858-.4893-.4412-.9956-.8502-1.502-1.2545l-.7737-.5885-.7821-.5706c-.5272-.3666-1.0543-.735-1.5946-1.0807l.7378 1.2384c.1095-1.3527.1634-2.7121.1634-4.0611.0057-1.3471-.0387-2.6998-.1342-4.0582-.0954-1.3594-.2531-2.7122-.4732-4.0611-.1124-.6736-.24-1.349-.3968-2.0226-.1511-.6839-.3391-1.3593-.563-2.0225-.2239.6632-.4128 1.3386-.5649 2.0225z"
          fill="#000"
        />
        <path
          d="m66.0632 27.7059c.2739.1294.5101.3259.6868.5715.1766.2456.289.5318.3259.8323.0368.3004-.0038.6055-.1162.887-.1134.2815-.2948.5299-.53.7217l-10.1683 8.2479-1.8176-16.6951z"
          fill="#000"
        />
        <path
          d="m32.0197 68.9795c7.0292 0 13.7703-2.7981 18.7411-7.7802 4.9699-4.9812 7.7623-11.7374 7.7623-18.7818v-9.0876c0-5.0889-2.0169-9.9691-5.6075-13.5673-3.5907-3.5982-8.4595-5.6198-13.537-5.6198h-.0473c-5.8503.0029-11.4606 2.3333-15.5973 6.4804s-6.4596 9.7707-6.4596 15.6342v30.6118c0 .5582.2211 1.0939.615 1.4887.3939.3959.9286.6169 1.4859.6169h12.6557z"
          fill="#fff"
          stroke="#000"
          strokeMiterlimit="10"
        />
        <path
          clipRule="evenodd"
          d="m39.3316 13.8137h.0465c1.2857 0 2.5579.1278 3.8003.3757l1.0373.207-.9724.4163c-3.2647 1.3975-7.1575 2.6466-11.4006 3.5876-2.2419.4971-4.4313.8759-6.522 1.1379l-1.1166.14.8665-.7181c3.9949-3.3104 9.033-5.1435 14.261-5.1464zm.0465.6561h-.0463c-4.6711.0026-9.1861 1.5104-12.899 4.2565 1.7046-.2457 3.4687-.5676 5.2678-.9665 3.7601-.8339 7.2371-1.9106 10.2344-3.1148-.8426-.116-1.6967-.1752-2.5569-.1752z"
          fill="#bec6c6"
          fillRule="evenodd"
        />
        <path
          d="m18.0859 51.0459v3.1382c6.983 5.7105 16.2218 9.935 26.7019 11.9377.9361-.4743 1.8449-1.0042 2.7215-1.589-11.8659-1.8968-22.1939-6.7713-29.4234-13.4869z"
          fill="#bec6c6"
        />
        <path
          d="m17.2744 36.2571v30.6127c0 .5583.2211 1.0939.615 1.4888.3949.3949.9286.6169 1.4859.6169h12.6547l-.0103.0047c7.0292 0 13.7703-2.799 18.7411-7.7802 4.9699-4.9812 7.7623-11.7384 7.7623-18.7828v-9.0876c0-5.0889-2.0169-9.969-5.6066-13.5673-2.696-2.7026-6.1148-4.5164-9.8008-5.2513-1.2215-.2438-2.4722-.3694-3.7362-.3694h-.0463c-5.1512.0028-10.1154 1.809-14.0518 5.0709-.5347.444-1.0514.9145-1.5455 1.4104-4.1386 4.1471-6.4615 9.7707-6.4615 15.6342z"
          stroke="#000"
          strokeMiterlimit="10"
        />
        <path
          d="m34.3174 28.0756c0-4.7167 3.8145-8.5397 8.5208-8.5397 4.7054 0 8.5209 3.823 8.5209 8.5397s-3.8146 8.5398-8.5209 8.5398-8.5208-3.824-8.5208-8.5398z"
          fill="#fff"
        />
        <path
          d="m34.3057 28.0753c0-4.7224 3.8192-8.5502 8.5312-8.5502s8.5313 3.8278 8.5313 8.5502-3.8193 8.5501-8.5313 8.5501c-4.711 0-8.5312-3.8277-8.5312-8.5501z"
          stroke="#bec6c6"
          strokeMiterlimit="10"
        />
        <path
          clipRule="evenodd"
          d="m7.78095 50.0382c-.18486-.2999-.55245-.4323-.8861-.3191s-.54483.4419-.50907.7924l1.22557 12.0108-11.09892 3.7749c-.33897.1153-.55052.4526-.50671.8079.04382.3554.33098.6312.6878.6607l21.70548 1.7939c.2841.0235.5573-.1149.7064-.3578.1491-.243.1488-.5492-.0008-.7919z"
          fill="#000"
          fillRule="evenodd"
        />
        <path
          d="m41.0439 28.4127c0-3.2893.8531-5.9552 1.9064-5.9552 1.0523 0 1.9063 2.6659 1.9063 5.9552s-.853 5.9551-1.9063 5.9551c-1.0524 0-1.9064-2.6668-1.9064-5.9551z"
          fill="#06aef1"
        />
        <path
          d="m37.0073 28.4125c0-1.0551 2.6602-1.9101 5.942-1.9101 3.2817 0 5.9419.855 5.9419 1.9101 0 1.0552-2.6602 1.9102-5.9419 1.9102-3.2818 0-5.942-.8559-5.942-1.9102z"
          fill="#06aef1"
        />
        <path
          d="m39.2759 44.6249 7.9918-2.9795c.5073-.1889.7671-.7585.5781-1.2658l-.3155-.8455c-.1889-.5073-.7585-.7671-1.2658-.5781l-7.9919 2.9794c-.5073.189-.767.7586-.5781 1.2659l.3155.8455c.1889.5072.7586.767 1.2659.5781z"
          fill="#65f8c3"
        />
        <path
          d="m25.1801 38.9607c3.2837 0 5.9457-2.6619 5.9457-5.9457 0-3.2837-2.662-5.9457-5.9457-5.9457s-5.9457 2.662-5.9457 5.9457c0 3.2838 2.662 5.9457 5.9457 5.9457z"
          fill="#65f8c3"
        />
        <path
          clipRule="evenodd"
          d="m28.8009 44.7926-2.7301-6.7439.7602-.3077 2.73 6.7439c.2949.7287 1.1094 1.0977 1.8517.8397l7.6138-2.6497.2696.7745-7.614 2.6498h-.0001c-1.1547.4014-2.4222-.1724-2.8811-1.3066z"
          fill="#65f8c3"
          fillRule="evenodd"
        />
        <path
          clipRule="evenodd"
          d="m25.1638 15.3141 13.4926-4.4266.5997 1.8278-13.4925 4.4267c-.0001 0-.0001 0-.0001 0-2.5823.8476-4.0936 4.0345-3.062 7.2683l.0002.0007c-.0003-.001.0418.1261.1167.3522.0777.2346.1906.5757.3281.9907.2677.8081.6241 1.8839.9805 2.9596l.1815.5479c.6459 1.9497 1.2457 3.7601 1.2508 3.7763l-1.8332.5833c.0003.001-.0417-.126-.1166-.352-.0777-.2345-.1907-.5757-.3282-.991-.2677-.8081-.6241-1.8838-.9805-2.9595l-.1844-.5567c-.6399-1.9316-1.2337-3.7239-1.2477-3.7668-1.2809-4.0155.499-8.435 4.295-9.6808z"
          fill="#65f8c3"
          fillRule="evenodd"
        />
        <g fill="#bec6c6">
          <path d="m43.1392 62.1688c.2943 0 .5328-.2385.5328-.5327 0-.2943-.2385-.5328-.5328-.5328-.2942 0-.5328.2385-.5328.5328 0 .2942.2386.5327.5328.5327z" />
          <path d="m52.8995 34.861c.2942 0 .5328-.2385.5328-.5328s-.2386-.5328-.5328-.5328c-.2943 0-.5328.2385-.5328.5328s.2385.5328.5328.5328z" />
          <path d="m38.7105 39.1251c.2943 0 .5328-.2385.5328-.5327 0-.2943-.2385-.5328-.5328-.5328-.2942 0-.5328.2385-.5328.5328 0 .2942.2386.5327.5328.5327z" />
          <path d="m32.232 23.2973c.2943 0 .5328-.2386.5328-.5328 0-.2943-.2385-.5328-.5328-.5328-.2942 0-.5328.2385-.5328.5328 0 .2942.2386.5328.5328.5328z" />
          <path d="m21.7354 52.2465c.2943 0 .5328-.2385.5328-.5328s-.2385-.5328-.5328-.5328c-.2942 0-.5328.2385-.5328.5328s.2386.5328.5328.5328z" />
        </g>
      </g>
    </SvgIcon>
  );
};

const QuestionRobot = props => {
  const { trans } = props;

  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState([{ state: 0 }]);
  const [chatNum, setChatNum] = useState(0);
  const [locked, setLocked] = useState(0);
  const [version, setVersion] = useState(2);
  const [currentExpand, setCurrentExpand] = useState(0);
  const [question, setQuestion] = useState("");

  const inputEl = useRef(null);
  const containerEl = useRef(null);
  const chatCopy = useRef(null);
  chatCopy.current = [...chats];

  const toggle = () => {
    setOpen(!open);
  };

  const keyPress = e => {
    const v = inputEl.current.value;
    if ((e.key === "Enter" || e.target.tagName === "BUTTON") && v && !locked) {
      setQuestion(v);
    }
  };

  // check if doc version changed
  useEffect(() => {
    const hrefs = window.location.href.split("docs/v");
    if (hrefs[1] && (hrefs[1].startsWith("0") || hrefs[1].startsWith("1"))) {
      setVersion(1);
    } else {
      setVersion(2);
    }
  }, []);

  // raise a new question
  useEffect(() => {
    if (question) {
      setChats([...chatCopy.current].concat({ value: question, state: 100 }));
      setLocked(true);
      getFaq({
        params: {
          question,
          version,
        },
      })
        .then(res => {
          if (res?.data?.response) {
            setChats(
              [...chatCopy.current].concat([
                { value: res.data.response.slice(0, 5), state: 1 },
              ])
            );
          }
          setLocked(false);
        })
        .catch(err => {
          console.log("err", err);
          setLocked(false);
        });
      if (inputEl && inputEl.current) {
        inputEl.current.value = "";
      }
    }
  }, [question, version]);

  // scroll when new chat entry created
  useEffect(() => {
    if (chats.length !== chatNum) {
      setChatNum(chats.length);
      if (containerEl && containerEl.current) {
        containerEl.current.scrollTop = containerEl.current.scrollHeight;
      }
    }
  }, [chats, chatNum]);

  // scroll when last answer is expand
  useEffect(() => {
    if (currentExpand + 1 === chats.length) {
      if (containerEl && containerEl.current) {
        containerEl.current.scrollTop = containerEl.current.scrollHeight;
      }
    }
  }, [currentExpand, chats]);

  const onMaskClick = () => {
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.robot}>
      {/* {open && (
        <div className={styles.dialog}>
          <div className={styles.dialogHeader}>
            Search engine powerd by{" "}
            <img src={milvus} className={styles.logo} alt="logo" />
          </div>
          <div ref={containerEl} className={styles.dialogContent}>
            {chats.map((chat, index) => {
              if (chat.state === 0) {
                return (
                  <div
                    key={`${index}-${chat.state}`}
                    className={styles.serverChat}
                  >
                    <WelcomBlock version={version} setInit={setQuestion} />
                  </div>
                );
              } else if (chat.state === 1) {
                return (
                  <div
                    key={`${index}-${chat.state}`}
                    className={styles.serverChat}
                  >
                    <AnswerBlock
                      chat={chat}
                      index={index}
                      setCurrent={setCurrentExpand}
                    />
                  </div>
                );
              }
              return (
                <div key={`${index}-${chat.state}`} className={styles.myChat}>
                  {chat.value}
                </div>
              );
            })}
          </div>
          <div className={styles.dialogInput}>
            <input
              ref={inputEl}
              placeholder="Ask MilMil Anything..."
              onKeyPress={keyPress}
            />
            <button onClick={keyPress}>{""}</button>
          </div>
        </div>
      )}
      <button
        onClick={toggle}
        className={`${styles.openBtn} ${open && styles.close}`}
      >
        {""}
      </button>
      {open && (
        <div
          className={styles.mask}
          role="presentation"
          onClick={onMaskClick}
        />
      )} */}
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <IconButton
        aria-label="open"
        size="large"
        onClick={handleOpen}
        disableFocusRipple
        disableRipple
        className={styles.openBtn}
      >
        <BirdIcon className={styles.openBtnIcon} />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <div className={styles.dialog}>
          <div className={styles.dialogHeader}>
            Search engine powerd by{" "}
            <img src={milvus} className={styles.logo} alt="logo" />
          </div>
          <div ref={containerEl} className={styles.dialogContent}>
            {chats.map((chat, index) => {
              if (chat.state === 0) {
                return (
                  <div
                    key={`${index}-${chat.state}`}
                    className={styles.serverChat}
                  >
                    <WelcomBlock version={version} setInit={setQuestion} />
                  </div>
                );
              } else if (chat.state === 1) {
                return (
                  <div
                    key={`${index}-${chat.state}`}
                    className={styles.serverChat}
                  >
                    <AnswerBlock
                      chat={chat}
                      index={index}
                      setCurrent={setCurrentExpand}
                      trans={trans}
                    />
                  </div>
                );
              }
              return (
                <div key={`${index}-${chat.state}`} className={styles.myChat}>
                  {chat.value}
                </div>
              );
            })}
          </div>
          <div className={styles.dialogInput}>
            <input
              ref={inputEl}
              placeholder="Ask MilMil Anything..."
              onKeyPress={keyPress}
            />
            <button onClick={keyPress}>{""}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QuestionRobot;
