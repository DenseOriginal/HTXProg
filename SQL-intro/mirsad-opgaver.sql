-- Opg 1
SELECT `AtomicNumber`, `Element`, `Period` FROM `elements` WHERE `Period` = 4;

-- Opg 2
SELECT `AtomicNumber`, `Element`, `Group` FROM `elements` WHERE `Group` <> 8;

-- Opg 3
SELECT `AtomicNumber`, `Element`, `Electronegativity`
FROM `elements`
WHERE `Electronegativity` < 2;

-- Opg 4
SELECT `AtomicNumber`, `Element`, `MeltingPoint`
FROM `elements`
ORDER BY `MeltingPoint` ASC;

-- Opg 5
UPDATE `elements`
SET `BoilingPoint` = 100
WHERE `Element` = 'Helium';
SELECT `AtomicNumber`, `Element`, `BoilingPoint` FROM `elements` WHERE `Element` = 'Helium';

-- Opg 6
INSERT INTO elements(
  AtomicNumber,
  Element,
  Symbol,
  AtomicMass,
  NumberofNeutrons,
  NumberofProtons,
  NumberofElectrons,
  Period,
  `Group`,
  Phase,
  Radioactive,
  `Natural`,
  Metal,
  Nonmetal,
  Metalloid,
  Type,
  AtomicRadius,
  Electronegativity,
  FirstIonization,
  Density,
  MeltingPoint,
  BoilingPoint,
  NumberOfIsotopes,
  Discoverer,
  Year,
  SpecificHeat,
  NumberofShells,
  NumberofValence
) VALUES (
  119,
  'Mohammdium',
  'Mm',
  1.007,
  0,
  1,
  1,
  1,
  1,
  'solid',
  'yes',
  'yes',
  NULL,
  'yes',
  NULL,
  'Nonmetal',
  0.79,
  2.2,
  13.5984,
  8.99E-05,
  14.175,
  20.28,
  3,
  'Cavendish',
  1766,
  14.304,
  1,
  1
);
SELECT `AtomicNumber`, `Element`, `BoilingPoint` FROM `elements` WHERE `Element` = 'Mohammadium';