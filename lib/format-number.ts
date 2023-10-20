function formatNumber(num: number): string {
  if (num >= 1000) {
    const units: string[] = ["K", "M", "B", "T"];
    let unitIndex = 0;

    while (num >= 1000 && unitIndex < units.length) {
      num /= 1000;
      unitIndex++;
    }

    return num.toFixed(1) + units[unitIndex - 1];
  }

  return num.toString();
}

export default formatNumber;
