function generateInitials(name: string): string {
  const parts = name.split(" ");
  let initials = "";

  for (const part of parts) {
    if (part.length > 0) {
      initials += part[0].toUpperCase();
    }
  }

  return initials.slice(0, 2);
}

export default generateInitials;
