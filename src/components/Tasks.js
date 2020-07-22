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

function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}

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
let currentPage = 0;

class Tasks extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tasksTodo: [],
            tasksComplete: [],
            addModalShow: false,
            numTasks: 6,
            someVar: "",
            cp: 0
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
                console.log("Isquivalent", this.state.tasksTodo, "and", response.data)
                if (this.state.tasksTodo.length === response.data.length) {
                    // console.log('***********Equivalent*************')
                } else {
                    // console.log("&&&&&&&&&&NOT EQUIVALENT&&&&&&&&&&&&&")
                    this.setState({ tasksTodo: response.data })
                    this.props.handler()
                }

                // 
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
                if (this.state.tasksComplete.length === response.data.length) {
                    // console.log('***********Equivalent*************')
                } else {
                    // console.log("&&&&&&&&&&NOT EQUIVALENT&&&&&&&&&&&&&")
                    this.setState({ tasksComplete: response.data })
                    this.props.handler()
                }
                // this.setState({ tasksComplete: response.data })

            }).catch((e) => {
                cannotGetTasks()
            })
        }
    }

    componentDidMount() {
        console.log("Componentdidmount")
        this.loadTasksTodo()
        this.loadTasksComplete()

    }

    componentDidUpdate() {
        console.log("Componentdidupdate")
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

        console.log("tasksTodo", tasksTodo)
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

        currentPage = this.state.cp
        // console.log(currentPage)
        return (
            <div style={scrolling}>

                <h1 style={mystyle}>📝 Tasks 📝</h1>
                <br />
                <div style={{ margin: '20px' }}>
                    <Tabs onSelect={(index) => {
                        this.setState({ cp: index })
                        this.props.handler()

                    }}>
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
export { currentPage }