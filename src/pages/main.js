import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { data } from '../Auth'
import { dataLogin } from '../Auth'
import Account from '../components/Account'
import Tasks from '../components/Tasks'

import CoolTabs from 'react-cool-tabs';
import { taskNumberTodo } from '../components/Tasks'
import { taskNumberComplete } from '../components/Tasks'
import { currentPage } from '../components/Tasks'

let mainData;
let heightEdited;
let prevTaskNumTodo = 0
let prevTaskNumComplete = 0

export class main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            height: 700,
            someVar: ''
        }
        this.handler = this.handler.bind(this)

    }

    handler() {
        this.setState({
            someVar: 'some value'
        })
    }


    componentDidUpdate() {

        if (currentPage === 0) {
            console.log('numbe 0r', taskNumberTodo)
            if (taskNumberTodo !== prevTaskNumTodo && taskNumberTodo !== 0) {

                prevTaskNumTodo = taskNumberTodo
                if (taskNumberTodo > 3) {
                    console.log('more than three?????')
                    this.setState((prevState, props) => ({
                        height: ((taskNumberTodo) * 270)
                    }))
                } else {
                    console.log('in 600 brah')
                    this.setState((prevState, props) => ({
                        height: 600
                    }))
                }
            }
        } else if (currentPage === 1) {
            console.log('number 1', taskNumberComplete)
            if (taskNumberComplete !== prevTaskNumComplete && taskNumberComplete !== 0) {
                prevTaskNumComplete = taskNumberComplete
                if (taskNumberComplete > 3) {
                    this.setState((prevState, props) => ({
                        height: ((taskNumberComplete) * 270)
                    }))
                } else {
                    this.setState((prevState, props) => ({
                        height: 600
                    }))
                }
            }
        }
        
    }

    render() {

        heightEdited = this.state.height.toString() + "px"

        if (data !== undefined) {
            mainData = data
        } else {
            mainData = dataLogin
        }
        return (
            <div>
                <CoolTabs
                    tabKey={'1'}
                    style={{ width: true, height: heightEdited, background: 'blue' }}
                    activeTabStyle={{ background: '#1319a4', color: 'white', }}
                    unActiveTabStyle={{ background: '#0c2561', color: 'white' }}
                    activeLeftTabBorderBottomStyle={{ background: '#white', height: 4 }}
                    activeRightTabBorderBottomStyle={{ background: 'white', height: 4 }}
                    tabsBorderBottomStyle={{ background: 'grey', height: 4 }}
                    leftContentStyle={{ background: '#0a225b' }}
                    rightContentStyle={{ background: '#0a225b' }}
                    leftTabTitle={'Main'}
                    rightTabTitle={'Account'}
                    leftContent={<Tasks handler={this.handler} />}
                    rightContent={<Account />}
                    contentTransitionStyle={'transform 0.6s ease-in'}
                    borderTransitionStyle={'all 0.6s ease-in'} />

            </div>
        )
        // } else {
        //     return (
        //         <Redirect to="/"/>
        //     )
        // }

    }
}

export default main
export { mainData }