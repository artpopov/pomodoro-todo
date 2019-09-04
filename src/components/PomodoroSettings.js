import React from "react";
import { Modal, Icon, Form, Grid, Button } from "semantic-ui-react";

class PomodoroSettings extends React.Component {
  state = {
    modalOpen: false,
    work: 25,
    breakTime: 5,
    longBreak: 30,
    pomodoros: 4
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  //TODO сделать валидацию для формы
  render() {
    const { work, breakTime, longBreak, pomodoros } = this.state;
    return (
      <Modal
        open={this.state.modalOpen}
        size="tiny"
        onClose={this.handleModal}
        trigger={
          <Icon
            name="cog"
            size="big"
            onClick={this.handleModal}
            style={{
              display: "flex",
              cursor: "pointer",
              padding: "10px 0 0 10px"
            }}
          />
        }
        centered={false}
      >
        <Modal.Header content="Настройки таймера" />
        <Modal.Content>
          <Form
            style={{ margin: "10px", fontSize: 16 }}
            onSubmit={this.handleSubmit}
          >
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column verticalAlign="middle">
                  <label>Продожительность помидора: </label>
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    name="work"
                    defaultValue={work}
                    onChange={this.handleChange}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column verticalAlign="middle">
                  <label>Продожительность короткого перерыва: </label>
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    name="breakTime"
                    defaultValue={breakTime}
                    onChange={this.handleChange}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column verticalAlign="middle">
                  <label>Продожительность длинного перерыва: </label>
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    name="longBreak"
                    defaultValue={longBreak}
                    onChange={this.handleChange}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column verticalAlign="middle">
                  <label>Помидоров до длинного перерыва (шт): </label>
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    name="pomodoros"
                    defaultValue={pomodoros}
                    onChange={this.handleChange}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button content="отмена" onClick={this.handleModal} />
          <Button
            color="green"
            content="Сохранить"
            onClick={() => {
              this.props.updateSettings(work, breakTime, longBreak, pomodoros);
              this.handleModal();
            }}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default PomodoroSettings;
