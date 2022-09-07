import React, { Component, createRef } from 'react';
import './css/visualizer.css'
import { useEffect } from 'react'

// Changing Variables
let ctx;

// constants
const width = 500;
const height = 200;
var counter = 0;


class Canvas extends Component {
    constructor(props) {
        super(props)
        console.log('the constructer ran')
        this.audio = new Audio(props.song)
        this.audio.crossOrigin = "anonymous"
        this.audio.preload = "none"
        this.canvas = createRef();
    }

    

    animationLooper(canvas) {
        canvas.width = width;
        canvas.height = height;

        ctx = canvas.getContext("2d");

        ctx.fillStyle = 'rgb(0,0,0)'
        ctx.fillRect(0, 0, width, height)
        ctx.lineWidth = 1
        ctx.strokeStyle = 'rgb(255,255,255)'
        ctx.beginPath()
        const sliceWidth = width * 1.0 / this.analyser.frequencyBinCount
        var x = 0
        for (let i = 0; i < this.analyser.frequencyBinCount; i++) {

            const v = this.frequency_array[i] / 300.0;
            const y = v * height / 2;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        ctx.stroke()
    }

    //refresh possibly not working because state is not finished loading, perhaps using effect instead of component did mount will be better?

    componentDidMount() {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.source = this.context.createMediaElementSource(this.audio);
        this.source.crossOrigin = "anonymous"
        this.analyser = this.context.createAnalyser();
        this.source.connect(this.analyser);
        this.analyser.connect(this.context.destination);
        this.frequency_array = new Uint8Array(this.analyser.frequencyBinCount);
        console.log('componentDidMount() ran')

    }
    

    togglePlay = () => {
        const { audio } = this;
        if (audio.paused) {
            console.log("audio playing mechanism ran")
            console.log('the audio that played was ', audio)
            audio.play();
            this.rafId = requestAnimationFrame(this.tick);

        } else {
            audio.pause();
            cancelAnimationFrame(this.rafId);
        }
    }

    tick = () => {
        console.log('tick ran')
        this.animationLooper(this.canvas.current);
        this.analyser.getByteTimeDomainData(this.frequency_array);
        this.rafId = requestAnimationFrame(this.tick);
        counter++;
    }

    componentWillUnmount() {
        console.log('component unmounted')
        cancelAnimationFrame(this.rafId);
        this.analyser.disconnect();
        this.source.disconnect();
    }

    shouldComponentUpdate() {
        //will run before render
        const { audio } = this;
        if (!audio.paused) {
            audio.pause();
            cancelAnimationFrame(this.rafId);
        }
        this.audio = new Audio(this.props.song)
        this.canvas = createRef();
        this.audio.crossOrigin = "anonymous"
        this.audio.preload = "none"
        return true
    }

    componentDidUpdate() {
        
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.source = this.context.createMediaElementSource(this.audio);
        this.source.crossOrigin = "anonymous"
        this.analyser = this.context.createAnalyser();
        this.source.connect(this.analyser);
        this.analyser.connect(this.context.destination);
        this.frequency_array = new Uint8Array(this.analyser.frequencyBinCount);
        console.log('the component updated alright')
    }

    render() {

        return <div className='visualizer-container'>
            <button className='play-button' onClick={this.togglePlay}>Play/Pause</button>
            <canvas className='visualizer-display' ref={this.canvas} />
        </div>
    }
}

export default Canvas;