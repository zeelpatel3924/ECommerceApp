import { Redirect } from "expo-router";

export default function Index() {
  // start at splash which will decide whether to show login or home
  return <Redirect href="/splash" />;
}
