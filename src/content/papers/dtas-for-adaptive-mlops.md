---
title: "Digital Twin Aggregates for adaptive MLOps retraining policies in healthcare"
description: "Proceedings paper proposing a Digital Twin-based architecture for healthcare applications"
authors:
  - "Davide Domini"
  - "Leonardo Micelli"
  - "Samuele Burattini"
  - "Sara Montagna"
year: 2026
venue: "Future Generation Computer Systems"
publicationType: "article"
bibtex: |
  @article{domini2026digital,
    title={Digital Twin Aggregates for adaptive MLOps retraining policies in healthcare},
    author={Domini, Davide and Micelli, Leonardo and Burattini, Samuele and Montagna, Sara},
    journal={Future Generation Computer Systems},
    pages={108674},
    year={2026},
    publisher={Elsevier}
  }
topics:
  - Machine Learning Operations
  - Digital Twin Aggregates
keywords:
  - human digital twins
  - personalized healthcare
featured: false
---

## Abstract

Digital Twins (DTs) are increasingly adopted as a technical solution for the digital representation of complex physical entities through models that process near-real-time data streams and provide feedback on the state and behavior of the Physical Twin (PT). When DT models are trained using Machine Learning (ML) techniques, their performance may degrade over time as the DT acquires new operational data that may differ from the data observed during initial training. In this paper, following Machine Learning Operations (MLOps) principles, we investigate how Digital Twin Aggregates (DTAs) can be integrated into DT-based systems to enable continuous monitoring of model performance and to support adaptive retraining strategies for the continuous delivery and maintenance of ML models ensuring that the DT remains a reliable representation of the PT throughout its lifecycle. We evaluate the approach in a healthcare case study involving DTs for diabetic patients and compare adaptive with periodic retraining showing that performance-based retraining maintains stable accuracy while reducing model updates. These results suggest that DTA-level monitoring enables more efficient adaptive MLOps lifecycles by triggering retraining in response to actual performance degradation rather than fixed schedules.