
import Preferences from "@/components/Preferences";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import Bio from "@/components/Bio";

export default function choosePreferences(){
    return(
        <>
        <Preferences />
        <Bio />
        </>
    )
}