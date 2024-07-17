'use client'
import React from 'react'
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient'
import * as reactSpring from '@react-spring/three'
import * as drei from '@react-three/drei'
import * as fiber from '@react-three/fiber'

export function Background() {
  return (
  <>
  <div className='fixed inset-0 -z-[1] w-screen h-screen'></div>
  <div className='fixed inset-0 -z-[3] w-screen h-screen bg-[#2A9D8F]'></div>
    <ShaderGradientCanvas
      importedfiber={{ ...fiber, ...drei, ...reactSpring }}
      style={{
        position: 'absolute',
        top: 0,
        zIndex: -2,
      }}
    >
      <ShaderGradient
        control='query'
        urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=on&bgColor1=%23000000&bgColor2=%23000000&brightness=1&cAzimuthAngle=180&cDistance=3.7&cPolarAngle=115&cameraZoom=1&color1=%232A9D8F&color2=%23E76F51&color3=%23264653&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=50&frameRate=10&grain=off&lightType=3d&pixelDensity=1&positionX=-0.5&positionY=-0.1&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=-10&rotationY=0&rotationZ=235&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.1&uFrequency=5.5&uSpeed=0.1&uStrength=2.4&uTime=0.2&wireframe=false'
      />
    </ShaderGradientCanvas>
  </>
  )
}