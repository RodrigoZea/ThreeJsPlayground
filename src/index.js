/* eslint-disable */
import React, { useRef, useState, useEffect, useMemo } from 'react'
import ReactDOM from "react-dom"
import * as THREE from "three"
import { Canvas, useThree, useRender, useLoader, extend } from 'react-three-fiber'
import { useTransition, a } from 'react-spring'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import './styles.scss'
import Particles from './Particles'

extend({ OrbitControls })
const Controls = props => {
    const { gl, camera } = useThree()
    const ref = useRef()
    useRender(() => ref.current.update())
    return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />
}

function Stars() {
    let group = useRef()
    let theta = 0
    useRender(() => {
        // Some things maybe shouldn't be declarative, we're in the render-loop here with full access to the instance
        const r = 5 * Math.sin(THREE.Math.degToRad((theta += 0.1)))
        const s = Math.cos(THREE.Math.degToRad(theta * 2))
        group.current.rotation.set(r, r, r)
        group.current.scale.set(s, s, s)
    })
    const [geo, mat, vertices, coords] = useMemo(() => {
        const geo = new THREE.SphereBufferGeometry(1, 10, 10)
        const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color('lightblue') })
        const coords = new Array(2000).fill().map(i => [Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400])
        return [geo, mat, vertices, coords]
    }, [])
    return (
        <group ref={group}>
            {coords.map(([p1, p2, p3], i) => (
                <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
            ))}
        </group>
    )
}

/*function Model({ url }) {
    const model = useLoader(GLTFLoader, url, loader => {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco-gltf/')
        loader.setDRACOLoader(dracoLoader)
    })
    return (
        <group rotation={[0, 0, 0]} position={[0, 0, 0]} scale={[7, 7, 7]}>
            {model.map(({ geometry, material }) => {
                const rocks = geometry.index.count < 80000
                const Material = rocks ? 'meshLambertMaterial' : 'meshStandardMaterial'
                return (
                    <mesh
                        key={geometry.uuid}
                        geometry={geometry}
                        castShadow={!rocks}
                        receiveShadow={!rocks}>
                        <Material attach="material" color="#575757"  map={material.map} roughness={1} />
                    </mesh>
                )
            })}
        </group>
    )
}*/

function Model({ url }) {
    const [gltf, set] = useState()
    useMemo(() => new GLTFLoader().load(url, set), [url])
    return gltf ? <primitive scale={[7, 7, 7]} object={gltf.scene} /> : null
}


export default function App() {
    return (
        <>
            <div className="bg">
                <Particles />
            </div>
            <h1>
                RODRIGO ZEA
            </h1>
            <h2>
                ロドリゴ・ゼア
            </h2>

            <Canvas camera={{ position: [0, 0, 15] }} shadowMap>
                <ambientLight intensity={1.5} />
                <pointLight intensity={2} position={[-10, -20, -10]} />
                <spotLight
                    castShadow
                    intensity={1.25}
                    angle={Math.PI / 8}
                    position={[25, 20, 15]}
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                <fog attach="fog" args={['#cc7b32', 16, 20]} />
                
                <Model url="src/earth.gltf" />
                <Controls
                    autoRotate
                    enablePan={false}
                    enableZoom={false}
                    enableDamping
                    dampingFactor={0.5}
                    rotateSpeed={1}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
            </Canvas>
            <div className="layer" />
        </>
    )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
