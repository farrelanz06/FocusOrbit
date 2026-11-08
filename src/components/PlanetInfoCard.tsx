// MEMBER 3 — Kartu data planet dari API (useState + useEffect + .then)
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { getPlanetInfo } from "../services/planetService";
import { PlanetInfo } from "../types/planetInfo";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";

interface Props {
  apiId: string;
}

export default function PlanetInfoCard({ apiId }: Props) {
  const [info, setInfo] = useState<PlanetInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  // Jalan lagi setiap planet ganti (apiId) atau tombol "Try again" ditekan
  useEffect(() => {
    let cancelled = false; // cegah hasil request lama menimpa yang baru

    setLoading(true);
    setErrorMessage(null);

    getPlanetInfo(apiId)
      .then((result) => {
        if (!cancelled) setInfo(result.data);
      })
      .catch((error: Error) => {
        if (!cancelled) setErrorMessage(error.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [apiId, reloadKey]);

  if (loading) return <Loading />;

  if (errorMessage !== null) {
    return (
      <ErrorMessage
        message={errorMessage}
        onRetry={() => setReloadKey(reloadKey + 1)}
      />
    );
  }

  if (info === null) return null;

  const tempText =
    info.avgTempKelvin > 0
      ? `${Math.round(info.avgTempKelvin - 273.15)} °C`
      : "No data";

  return (
    <View style={s.card}>
      <Text style={s.title}>🛰️ Mission Data: {info.englishName}</Text>
      <Text style={s.row}>Gravity: {info.gravity} m/s²</Text>
      <Text style={s.row}>Radius: {info.meanRadius} km</Text>
      <Text style={s.row}>Orbit period: {info.orbitDays} days</Text>
      <Text style={s.row}>Avg temperature: {tempText}</Text>
      <Text style={s.row}>Known moons: {info.moonCount}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: "#171E3D",
    borderRadius: 14,
    padding: 14,
    marginBottom: 15,
  },
  title: { color: "#38BDF8", fontWeight: "bold", marginBottom: 6 },
  row: { color: "#C8CEE3", fontSize: 13, marginTop: 2 },
});
