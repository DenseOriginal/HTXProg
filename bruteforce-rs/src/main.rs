const POSSIBLE_CHARS: &str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

struct IteratePossibilities {
    chars: String,
    max_length: usize,
    combi: Vec<usize>,
    len_of_chars: usize,
}

impl IteratePossibilities {
    fn new(chars: &str, max_length: usize) -> IteratePossibilities {
        let combi = vec![0];
        let len_of_chars = chars.len();

        IteratePossibilities {
            chars: chars.to_string(),
            max_length,
            combi,
            len_of_chars,
        }
    }
}

impl Iterator for IteratePossibilities {
    type Item = String;

    fn next(&mut self) -> Option<Self::Item> {
        if self.combi.len() > self.max_length {
            return None;
        }

        let result = self.combi.iter().map(|idx| &self.chars[*idx..*idx + 1]).collect::<String>();
        self.combi = increment_list(&self.combi, self.len_of_chars);
        Some(result)
    }
}

fn increment_list(list: &[usize], base: usize) -> Vec<usize> {
    let mut carry = true;
    let mut incremented_list = list.to_vec();

    for val in incremented_list.iter_mut() {
        let new_val = if carry { (*val + 1) % base } else { *val };
        carry = carry && new_val == 0;
        *val = new_val;
    }

    if carry {
        incremented_list.push(0);
    }

    incremented_list
}

fn time_brute_force(pass: &str) -> u128 {
    let start = std::time::Instant::now();

    let pass_iterator = IteratePossibilities::new(POSSIBLE_CHARS, std::usize::MAX);
    for combi in pass_iterator {
        if combi == pass {
            break;
        }
    }

    let end = std::time::Instant::now();
    end.duration_since(start).as_millis()
}

fn main() {
    println!("Time to bruteforce 'Hej': {:?} ms", time_brute_force("Hej"));
    println!("Time to bruteforce 'Hello': {:?} ms", time_brute_force("Hello"));
}