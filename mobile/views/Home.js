import React, { useState } from 'react';

export default function Home() {
    return(
        <ImageBackground source={require('../assets/background.png')} imageStyle={tailwind('opacity-20')}/>
    )
}
