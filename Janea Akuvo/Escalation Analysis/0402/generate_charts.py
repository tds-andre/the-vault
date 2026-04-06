"""
Escalation Analysis — Executive Report Asset Generator
Generates all SVG charts for the executive report.

Usage:
    python generate_charts.py

Assumes matplotlib and numpy are available in the active environment.
Output: SVG files in the same directory as this script.
"""

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
import os

OUT = os.path.dirname(os.path.abspath(__file__))

# === STYLE ===
plt.rcParams.update({
    'font.family': 'sans-serif',
    'font.size': 11,
    'axes.spines.top': False,
    'axes.spines.right': False,
    'axes.grid': True,
    'grid.alpha': 0.12,
    'grid.linewidth': 0.5,
    'figure.facecolor': 'white',
    'axes.facecolor': 'white',
    'axes.linewidth': 0.6,
    'xtick.major.width': 0.6,
    'ytick.major.width': 0.6,
})

CORAL  = '#D85A30'
BLUE   = '#378ADD'
PURPLE = '#534AB7'
TEAL   = '#1D9E75'
AMBER  = '#BA7517'
GRAY   = '#888780'
RED    = '#E24B4A'
GREEN  = '#639922'
LGRAY  = '#D3D1C7'


def save(fig, name):
    fig.savefig(os.path.join(OUT, name), format='svg', bbox_inches='tight', pad_inches=0.15)
    plt.close(fig)
    print(f"  -> {name}")


# ================================================================
# Chart 1: Dataset funnel
# ================================================================
def chart_funnel():
    fig, ax = plt.subplots(figsize=(7, 3.5))

    labels = ['All accounts', 'After biz filter', 'Network accounts\n(2+ per person)', 'Accounts with\n>=1 DQ']
    values = [42678, 41621, 17839, 23426]
    colors = [LGRAY, GRAY, BLUE, CORAL]

    bars = ax.barh(range(len(labels)), values, color=colors, height=0.6, alpha=0.85)
    ax.set_yticks(range(len(labels)))
    ax.set_yticklabels(labels, fontsize=10)
    ax.invert_yaxis()
    ax.set_xlabel('Number of accounts')
    ax.set_title('Dataset funnel', fontweight='medium', fontsize=13)

    for i, (bar, val) in enumerate(zip(bars, values)):
        pct = f'({val/42678*100:.0f}%)' if i > 0 else ''
        ax.text(val + 300, bar.get_y() + bar.get_height()/2,
                f'{val:,} {pct}', va='center', fontsize=9)

    ax.set_xlim(0, 52000)
    return fig


# ================================================================
# Chart 2: Coverage by W
# ================================================================
def chart_coverage():
    fig, ax = plt.subplots(figsize=(7, 4))

    W = [5, 15, 25, 35]
    pct_net = [17.6, 23.0, 28.0, 30.5]
    pct_all = [5.7, 7.4, 9.0, 9.9]

    x = np.arange(len(W))
    width = 0.35

    bars1 = ax.bar(x - width/2, pct_net, width, label='% of network DQs', color=CORAL, alpha=0.85)
    bars2 = ax.bar(x + width/2, pct_all, width, label='% of ALL DQs', color=BLUE, alpha=0.85)

    ax.set_xlabel('Escalation window W (days)')
    ax.set_ylabel('DQ episodes covered (%)')
    ax.set_title('How many DQs could an alert have caught?', fontweight='medium', fontsize=13)
    ax.set_xticks(x)
    ax.set_xticklabels([f'W={w}d' for w in W])
    ax.legend(frameon=False)
    ax.set_ylim(0, 38)

    for bar in bars1:
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.8,
                f'{bar.get_height():.1f}%', ha='center', va='bottom', fontsize=9)
    for bar in bars2:
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.8,
                f'{bar.get_height():.1f}%', ha='center', va='bottom', fontsize=9)
    return fig


# ================================================================
# Chart 3: Co-delinquency lift by W
# ================================================================
def chart_co_dq_lift():
    fig, ax = plt.subplots(figsize=(7, 3.5))

    W = [5, 15, 25, 35]
    lift = [1.16, 1.09, 1.08, 1.08]

    ax.plot(W, lift, 'o-', color=CORAL, linewidth=2, markersize=8)
    ax.axhline(y=1.0, color=GRAY, linewidth=0.8, linestyle='--', alpha=0.5)
    ax.fill_between(W, 1.0, lift, alpha=0.1, color=CORAL)

    for i, (w, l) in enumerate(zip(W, lift)):
        ax.annotate(f'{l:.2f}x', (w, l), textcoords="offset points",
                    xytext=(0, 12), ha='center', fontsize=10, color=CORAL, fontweight='medium')

    ax.set_xlabel('Escalation window W (days)')
    ax.set_ylabel('Lift vs random baseline')
    ax.set_title('Is co-delinquency stronger than chance?', fontweight='medium', fontsize=13)
    ax.set_ylim(0.95, 1.25)
    ax.set_xticks(W)
    return fig


# ================================================================
# Chart 4: Duration comparison
# ================================================================
def chart_duration():
    fig, ax = plt.subplots(figsize=(7, 4))

    labels = ['A\n(trigger)', 'A intra-\nbaseline', 'B\n(escalated)', 'B intra-\nbaseline', 'Combined\nA+B', 'Global\nbaseline']
    means = [14.0, 8.6, 11.8, 9.3, 36.4, 10.5]
    colors = [CORAL, LGRAY, BLUE, LGRAY, PURPLE, GRAY]

    bars = ax.bar(range(len(labels)), means, color=colors, alpha=0.85, width=0.7)
    ax.set_xticks(range(len(labels)))
    ax.set_xticklabels(labels, fontsize=9)
    ax.set_ylabel('Mean DQ duration (days)')
    ax.set_title('Are escalation DQs longer than usual?', fontweight='medium', fontsize=13)

    for bar, val in zip(bars, means):
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.5,
                f'{val:.1f}d', ha='center', va='bottom', fontsize=9)

    ax.annotate('1.63x', xy=(0, 14.0), xytext=(0.5, 20),
                arrowprops=dict(arrowstyle='->', color=CORAL, lw=1), fontsize=9, color=CORAL, ha='center')
    ax.annotate('', xy=(1, 8.6), xytext=(0.5, 19.5),
                arrowprops=dict(arrowstyle='->', color=CORAL, lw=1))

    ax.annotate('1.27x', xy=(2, 11.8), xytext=(2.5, 18),
                arrowprops=dict(arrowstyle='->', color=BLUE, lw=1), fontsize=9, color=BLUE, ha='center')
    ax.annotate('', xy=(3, 9.3), xytext=(2.5, 17.5),
                arrowprops=dict(arrowstyle='->', color=BLUE, lw=1))

    return fig


# ================================================================
# Chart 5: Negative outcome incidence — grouped bars at Z=90d
# ================================================================
def chart_negative_incidence():
    fig, ax = plt.subplots(figsize=(7, 4))

    groups = ['Esc A-side', 'Esc B-side', 'Esc A+B', 'Random\nbaseline', 'Intra-acct\nbaseline']
    values = [8.3, 8.0, 11.8, 1.5, 3.4]
    colors = [CORAL, BLUE, PURPLE, GRAY, AMBER]

    bars = ax.bar(range(len(groups)), values, color=colors, alpha=0.85, width=0.65)
    ax.set_xticks(range(len(groups)))
    ax.set_xticklabels(groups, fontsize=9)
    ax.set_ylabel('Incidence rate (%)')
    ax.set_title('Negative outcome incidence (Z=90d, W=15d)', fontweight='medium', fontsize=13)

    for bar, val in zip(bars, values):
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.3,
                f'{val:.1f}%', ha='center', va='bottom', fontsize=10, fontweight='medium')

    # Lift annotations
    ax.annotate('3.5x vs intra', xy=(2, 11.8), xytext=(3.5, 13),
                arrowprops=dict(arrowstyle='->', color=PURPLE, lw=1),
                fontsize=9, color=PURPLE, ha='center')
    ax.annotate('7.9x vs random', xy=(2, 11.8), xytext=(3.5, 11),
                fontsize=9, color=PURPLE, ha='center')

    ax.set_ylim(0, 16)
    return fig


# ================================================================
# Chart 6: DQ recurrence — grouped bars at Z=90d
# ================================================================
def chart_recurrence():
    fig, ax = plt.subplots(figsize=(6, 4))

    groups = ['Trigger accounts\n(A-side)', 'Random\nbaseline']
    values = [82.0, 21.1]
    colors = [CORAL, GRAY]

    bars = ax.bar(range(len(groups)), values, color=colors, alpha=0.85, width=0.5)
    ax.set_xticks(range(len(groups)))
    ax.set_xticklabels(groups, fontsize=10)
    ax.set_ylabel('% with >=1 new DQ start')
    ax.set_title('DQ recurrence on trigger accounts (Z=90d)', fontweight='medium', fontsize=13)
    ax.set_ylim(0, 100)

    for bar, val in zip(bars, values):
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 2,
                f'{val:.1f}%', ha='center', va='bottom', fontsize=12, fontweight='medium')

    ax.annotate('3.9x lift', xy=(0.5, 60), fontsize=14, color=CORAL,
                ha='center', fontweight='medium')

    return fig


# ================================================================
# Chart 7: Lift comparison across outcome categories — Z=90d
# ================================================================
def chart_lift_categories():
    fig, ax = plt.subplots(figsize=(7, 4))

    categories = ['Terminal', 'Negative', 'Positive']
    lift_rand =  [6.0, 7.9, 9.8]
    lift_intra = [6.0, 3.5, 2.2]

    x = np.arange(len(categories))
    width = 0.3

    bars1 = ax.bar(x - width/2, lift_rand, width, label='vs random baseline', color=CORAL, alpha=0.85)
    bars2 = ax.bar(x + width/2, lift_intra, width, label='vs intra-account baseline', color=BLUE, alpha=0.85)

    ax.axhline(y=1, color=GRAY, linewidth=0.8, linestyle='--', alpha=0.5)
    ax.set_ylabel('Lift (x)')
    ax.set_title('Outcome lift by category (Z=90d, W=15d)', fontweight='medium', fontsize=13)
    ax.set_xticks(x)
    ax.set_xticklabels(categories, fontsize=11)
    ax.legend(frameon=False)
    ax.set_ylim(0, 12)

    for bar in bars1:
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.2,
                f'{bar.get_height():.1f}x', ha='center', va='bottom', fontsize=9, fontweight='medium')
    for bar in bars2:
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.2,
                f'{bar.get_height():.1f}x', ha='center', va='bottom', fontsize=9, fontweight='medium')

    return fig


# ================================================================
# Chart 8: Overlap types (FILO/FIFO/After)
# ================================================================
def chart_overlap_types():
    fig, ax = plt.subplots(figsize=(5, 3.5))

    labels = ['FILO\n(B resolves\ninside A)', 'FIFO\n(B outlasts A)', 'After\n(B starts after\nA ends)']
    values = [4700, 2118, 1684]
    colors = [BLUE, TEAL, GRAY]

    bars = ax.bar(range(len(labels)), values, color=colors, alpha=0.85, width=0.6)
    ax.set_xticks(range(len(labels)))
    ax.set_xticklabels(labels, fontsize=9)
    ax.set_ylabel('Number of DQ pairs')
    ax.set_title('How do escalation pairs overlap? (W=5d)', fontweight='medium', fontsize=12)

    for bar, val in zip(bars, values):
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 60,
                f'{val:,}', ha='center', va='bottom', fontsize=10, fontweight='medium')
    return fig


# ================================================================
# Chart 9: Cardinality type comparison
# ================================================================
def chart_cardinality():
    fig, ax = plt.subplots(figsize=(7, 4))

    labels = ['1 person,\nmulti-account', '1 person,\nsingle account', 'Shared acct\n(multi-acct person)', 'Single\nshared acct']
    pct_with_dq = [47.2, 62.4, 48.0, 61.6]
    pct_lifespan = [1.67, 3.01, 1.43, 2.77]

    x = np.arange(len(labels))
    width = 0.35

    bars1 = ax.bar(x - width/2, pct_with_dq, width, label='% accounts with any DQ', color=CORAL, alpha=0.85)
    bars2 = ax.bar(x + width/2, [v * 10 for v in pct_lifespan], width, label='Avg % lifespan in DQ (x10)', color=BLUE, alpha=0.85)

    ax.set_xticks(x)
    ax.set_xticklabels(labels, fontsize=9)
    ax.set_ylabel('Percentage')
    ax.set_title('Are multi-account holders riskier?', fontweight='medium', fontsize=13)
    ax.legend(frameon=False)

    for bar, val in zip(bars1, pct_with_dq):
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 1,
                f'{val:.1f}%', ha='center', fontsize=8)
    for bar, val in zip(bars2, pct_lifespan):
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 1,
                f'{val:.2f}%', ha='center', fontsize=8)
    return fig


# ================================================================
# GENERATE ALL
# ================================================================
if __name__ == '__main__':
    print("Generating charts...")
    save(chart_funnel(),              '01-dataset-funnel.svg')
    save(chart_coverage(),            '02-coverage-by-window.svg')
    save(chart_co_dq_lift(),          '03-co-dq-lift.svg')
    save(chart_duration(),            '04-duration-comparison.svg')
    save(chart_negative_incidence(),  '05-negative-incidence.svg')
    save(chart_recurrence(),          '06-dq-recurrence.svg')
    save(chart_lift_categories(),     '07-lift-by-category.svg')
    save(chart_overlap_types(),       '08-overlap-types.svg')
    save(chart_cardinality(),         '09-cardinality-comparison.svg')
    print(f"\nAll charts saved to: {OUT}")
