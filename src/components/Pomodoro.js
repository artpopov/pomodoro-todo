import React from "react";
import { Container, Button } from "semantic-ui-react";
import PomodoroSettings from "./PomodoroSettings";
import "./Pomodoro.css";

export default class Pomodoro extends React.Component {
  state = {
    isRunning: false,
    timerID: null,
    currentTime: "25:00",
    timeLeft: 1500,
    work: 25,
    breakTime: 5,
    longBreak: 30,
    currentCycle: "work",
    pomodoros: 4,
    pomodorosDone: 0
  };

  stopTimer = () => {
    clearInterval(this.state.timerID);
    this.setState({
      isRunning: false,
      currentCycle: "work",
      pomodorosDone: 0,
      timeLeft: this.state.work * 60,
      currentTime: this.format(this.state.work * 60)
    });
  };

  //здесь вся логика помидорного таймера
  toggleTimer = () => {
    console.log(this.props.active);
    if (this.state.isRunning && this.state.currentCycle === "work") {
      console.log(this.state.work / 1000);
      this.props.sendTick(this.props.active, this.state.work / 1000);
    }
    if (this.state.isRunning === false) {
      this.setState({ isRunning: true });
      let timerID = setInterval(() => {
        if (this.state.timeLeft === 0) {
          if (this.state.pomodorosDone === this.state.pomodoros) {
            this.setState({
              currentCycle: "longBreak",
              timeLeft: this.state.longBreak * 60,
              currentTime: this.format(this.state.timeLeft),
              pomodorosDone: 0
            });
          } else if (this.state.currentCycle === "work") {
            this.setState({
              currentCycle: "break",
              timeLeft: this.state.breakTime * 60,
              currentTime: this.format(this.state.timeLeft)
            });
          } else {
            this.setState({
              currentCycle: "work",
              timeLeft: this.state.work * 60,
              currentTime: this.format(this.state.timeLeft),
              pomodorosDone: this.state.pomodorosDone + 1
            });
          }
        }
        this.setState({ timeLeft: this.state.timeLeft - 1, timerID });
        this.setState({ currentTime: this.format(this.state.timeLeft) });
      }, 1000);
    } else {
      this.setState({ isRunning: false });
      clearInterval(this.state.timerID);
    }
  };

  format = seconds => {
    let m = Math.floor((seconds % 3600) / 60);
    let s = Math.floor((seconds % 3600) % 60);
    let timeFormated = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    return timeFormated;
  };

  updateSettings = (work, breakTime, longBreak, pomodoros) => {
    this.setState({
      work,
      breakTime,
      longBreak,
      pomodoros,
      currentCycle: "work",
      pomodorosDone: 1,
      timeLeft: work * 60,
      currentTime: this.format(work * 60)
    });
  };

  renderType = () => {
    switch (this.state.currentCycle) {
      case "work":
        return "Время работать";
      case "break":
        return "Короткий перерыв";
      case "longBreak":
        return "Длинный перерыв";
      default:
        break;
    }
  };

  render() {
    return (
      <Container
        style={{
          backgroundColor:
            this.state.currentCycle === "work" ? "#ff6347" : "#90ee90",
          borderRadius: "10px",
          marginBottom: "10px"
        }}
      >
        <PomodoroSettings updateSettings={this.updateSettings} />
        <div style={{ fontSize: 36 }}>{this.renderType()}</div>
        <div className="timer">{this.state.currentTime}</div>
        <div className="control-buttons">
          <Button onClick={() => this.toggleTimer()}>
            {!this.state.isRunning ? "Старт" : "Пауза"}{" "}
          </Button>
          <Button onClick={() => this.stopTimer()}>Сброс</Button>
        </div>
        <div style={{ paddingBottom: "15px", fontSize: 18 }}>
          Помидоров до длительного перерыва:{" "}
          {this.state.pomodoros - this.state.pomodorosDone}
        </div>
      </Container>
    );
  }
}
