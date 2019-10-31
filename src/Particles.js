/* eslint-disable */
import React from 'react';
import ParticleField from 'react-particles-webgl';

export default class Particles extends React.Component {
    render() {
        const config = {
            showCube: false,
            dimension: '2D',
            velocity: 0.3,
            boundaryType: 'bounce',
            antialias: false,
            direction: {
                xMin: -1,
                xMax: 0.2,
                yMin: -1,
                yMax: 0.2,
                zMin: -1,
                zMax: 0.3
            },
            lines: {
                colorMode: 'rainbow',
                color: '#351CCB',
                transparency: 0.9,
                limitConnections: true,
                maxConnections: 20,
                minDistance: 150,
                visible: false
            },
            particles: {
                colorMode: 'solid',
                color: '#75b2c7',
                transparency: 0.6,
                shape: 'circle',
                boundingBox: 'canvas',
                count: 500,
                minSize: 10,
                maxSize: 14,
                visible: true
            },
            cameraControls: {
                enabled: false,
                enableDamping: true,
                dampingFactor: 0.2,
                enableZoom: true,
                autoRotate: false,
                autoRotateSpeed: 0.3,
                resetCameraFlag: false
            }
        }

        return(<ParticleField config={config} />)
    }
}