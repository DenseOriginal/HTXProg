const POSSIBLE_CHARS: &str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

fn increment_list(list: &mut Vec<usize>, base: usize) {
    let mut carry = true;


    for val in list.iter_mut() {
        let new_val = if carry { (*val + 1) % base } else { *val };
        carry = carry && new_val == 0;
        *val = new_val;
    }

    if carry {
        list.push(0);
    }
}

fn time_brute_force(pass: &str) -> u128 {
    let start = std::time::Instant::now();
    let mut combi = vec![0];
    let len_of_chars = POSSIBLE_CHARS.len();
    let hashed_pass: Vec<usize> = pass.chars().map(|ch| POSSIBLE_CHARS.find(ch).unwrap()).collect();

    
    while combi != hashed_pass {
        increment_list(&mut combi, len_of_chars);
    }

    let end = std::time::Instant::now();
    end.duration_since(start).as_millis()
}

fn main() {
    println!("Time to bruteforce 'Hej': {:?} ms", time_brute_force("Hej"));
    println!("Time to bruteforce 'Hello': {:?} ms", time_brute_force("Hello"));
}