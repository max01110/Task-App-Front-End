import React, { Component } from 'react'
import axios from 'axios'
import { mainData } from '../pages/main'
import {
    AwesomeButton,
    AwesomeButtonProgress,
} from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
// import 'react-tabs/style/react-tabs.css'

import AddTaskModal from './AddTaskModal';
import TaskDisplay from './TaskDisplay'

toast.configure()
function cannotGetTasks() {
    // toast.error("⚠️We were not able to retrieve your tasks", {
    //     position: toast.POSITION.TOP_CENTER
    // })
    // toast.warning("⚠️Try to login again!", {
    //     position: toast.POSITION.TOP_RIGHT,
    //     autoClose: false
    // })
}

let data;
let taskNumberTodo;
let taskNumberComplete;

class Tasks extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tasksTodo: [],
            tasksComplete: [],
            addModalShow: false,
            numTasks: 6,
            someVar: ""
        }
        this.loadTasksTodo = this.loadTasksTodo.bind(this);
        this.handlerTask = this.handlerTask.bind(this);

    }


    loadTasksTodo() {
        if (data !== undefined) {
            axios.get('https://michet-task-manager.herokuapp.com/tasks?completed=false', {
                headers: {
                    'Authorization': `Bearer ${data.token}`,
                }
            }).then((response) => {
                this.setState({ tasksTodo: response.data })
                this.props.handler()
            }).catch((e) => {
                cannotGetTasks()
            })
        }
    }

    loadTasksComplete() {
        if (data !== undefined) {
            axios.get('https://michet-task-manager.herokuapp.com/tasks?completed=true', {
                headers: {
                    'Authorization': `Bearer ${data.token}`,
                }
            }).then((response) => {
                this.setState({ tasksComplete: response.data })
                this.props.handler()
            }).catch((e) => {
                cannotGetTasks()
            })
        }
    }

    componentDidMount() {
        this.loadTasksTodo()
        this.loadTasksComplete()

    }

    componentDidUpdate() {
        this.loadTasksTodo()
        this.loadTasksComplete()
    }
    handlerTask() {
        this.setState({
            someVar: 'some value'
        })
    }


    render() {
        let addModalClose = () => this.setState({ addModalShow: false })

        data = {
            ...mainData
        }

        const { tasksTodo, tasksComplete } = this.state

        // const tasks = [{description: 'rg', completed: false},
        // {description: 'bla', completed: false},
        // {description: 'foo', completed: false},
        // {description: 'bar', completed: false},
        // {description: 'yuup', completed: false},
        // {description: 'bla', completed: false},
        // {description: 'bla', completed: false},
        // {description: 'bla', completed: false},
        // {description: 'bla', completed: false}]
        // // console.log(this.props.props())
        // this.props.props()
        // this.props.props()

        taskNumberTodo = tasksTodo.length//this.state.tasks.length
        taskNumberComplete = tasksComplete.length//this.state.tasks.length


        const mystyle = {
            color: "white",
            // backgroundColor: "#090252",
            padding: "10px",
            fontFamily: "Arial",
            textAlign: "center"
        };

        const mainstyle = {
            color: "white",
            textAlign: "center",
            fontSize: "20px"

        }

        const buttonStyle = {
            position: "absolute",
            left: "70%",
            top: "10px"
        }
        const scrolling = {
            overflow: 'auto'
        }

        const tabStyle = {
            display: "inline-block",
            border: "1px solid transparent",
            borderBottom: "none",
            bottom: "-1px",
            position: "relative",
            listStyle: "none",
            padding: "6px 12px",
            cursor: "pointer"
        }

        return (
            <div style={scrolling}>

                <h1 style={mystyle}>📝 Tasks 📝</h1>
                <br />
                <div style={{ margin: '20px' }}>
                    <Tabs>
                        <TabList>
                            <Tab>To Do</Tab>
                            <Tab>Completed</Tab>
                        </TabList>

                        <TabPanel>
                            <div style={mainstyle}>
                                {
                                    tasksTodo.length ?
                                        tasksTodo.map((task, index) => <TaskDisplay key={task._id} data={task} handler={this.handlerTask} number={index} />) :
                                        null
                                }

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div style={mainstyle}>
                                {
                                    tasksComplete.length ?
                                        tasksComplete.map((task, index) => <TaskDisplay key={task._id} data={task} handler={this.handlerTask} number={index} />) :
                                        null
                                }

                            </div>
                        </TabPanel>

                    </Tabs>
                </div>

                <AwesomeButton
                    type="primary"
                    size="large"
                    style={buttonStyle}
                    onPress={next => {
                        this.setState({ addModalShow: true })
                    }}
                >
                    Add Task
            </AwesomeButton>


                <AddTaskModal
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                    Refresh={this.loadTasksTodo}
                    props={this.props}
                    tasks={tasksTodo.length}
                    onStatusUpdate={this.loadTasksTodo}
                ></AddTaskModal>

                {/* <button onClick={props.props}>Test</button> */}
            </div>
        )
    }
}

export default Tasks

export { taskNumberTodo }
export { taskNumberComplete }
