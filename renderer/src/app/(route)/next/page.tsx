"use client";
import Link from "next/link";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function HomePage() {
  const [value, setValue] = useState("**Hello world!!!**");
  const onChangeValue = (e: string | undefined) => {
    if (!e) return;
    setValue(e);
  };
  return (
    <div className="container">
      <ReactMarkdown>{value}</ReactMarkdown>
    </div>
  );
}
