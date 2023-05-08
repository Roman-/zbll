export const random_element = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
}

// shuffles array in place
export const shuffle = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// "H RLFF OsA" -> "H-RLFF O/A"
export const formatZbllKey = key => {
    const [oll, coll, zbll] = key.split(' ');
    return `${oll}-${coll} ${zbll.replace('s', '/')}`;
}

