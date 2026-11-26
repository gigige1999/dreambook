import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Feather, SkipForward, Stamp } from 'lucide-react';
import { libraryAudio } from '../utils/audio';
import { ResilientImage } from './EvidenceIcon';
import {
  CrimsonWaxSealMedallion,
  PaperFiberOverlay,
  VictorianCornerFiligree,
} from './VictorianOrnaments';
import {
  DeskLampArt,
  DeskMagnifierArt,
  DeskTeacupArt,
} from './VisualKeepsakes';

const LIBRARY_BACKDROP = 'src/assets/images/library_interior_rusty_fresh_1795439953648.jpg';

interface DreamkeeperPrologueProps {
  onComplete: () => void;
}

const PAGE_NUMERALS = ['Ⅰ', 'Ⅱ', 'Ⅲ'] as const;

export const DreamkeeperPrologue: React.FC<DreamkeeperPrologueProps> = ({
  onComplete,
}) => {
  const [pageIdx, setPageIdx] = useState(0);

  const goNext = () => {
    libraryAudio.playPageTurn();
    if (pageIdx < 2) {
      setPageIdx((p) => p + 1);
    } else {
      libraryAudio.playWaxSealStamp();
      onComplete();
    }
  };

  const goPrev = () => {
    if (pageIdx > 0) {
      libraryAudio.playPageTurn();
      setPageIdx((p) => p - 1);
    }
  };

  return (
    <main className="relative h-screen w-screen overflow-y-auto library-scroll flex items-center justify-center bg-[#2A1D13] p-4 sm:p-8">
      {/* Sunlit Library Backdrop with Warm Vignette */}
      <ResilientImage
        src={LIBRARY_BACKDROP}
        alt="晨露梦境图书馆大厅远景"
        fallbackTitle="晨露梦境图书馆"
        className="fixed inset-0 w-full h-full object-cover object-center opacity-55"
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(54,34,18,0.45),rgba(20,12,7,0.88)_85%)]"
      />

      {/* Watercolor Ivory Parchment Epistle with Delicate Gold-Foil Border */}
      <section
        aria-label="守梦人开场引导手谕"
        className="relative z-10 w-full max-w-2xl bg-vintage-folio desk-ink-card rounded-[3px] p-2 sm:p-2.5 text-[#241B14] overflow-hidden"
      >
        <PaperFiberOverlay idSuffix="prologue-epistle" light />
        <VictorianCornerFiligree color="#9B753D" sizeClass="w-5 h-5" />

        <div className="relative z-10 rounded-[2px] gilt-hairline-frame px-5 py-6 sm:px-9 sm:py-7 flex flex-col justify-between min-h-[440px]">
          {/* Header Row: Epistle Title & Skip Shortcut */}
          <div className="flex items-center justify-between gap-4 border-b border-dashed border-[#C7B087] pb-3">
            <div className="flex items-center gap-2 text-xs font-serif-body text-[#6A5236]">
              <Feather className="w-3.5 h-3.5 text-[#8E2D20]" />
              <span className="italic">晨露梦境图书馆 · 守梦人值班手谕</span>
            </div>

            <button
              type="button"
              onClick={() => {
                libraryAudio.playPageTurn();
                onComplete();
              }}
              className="inline-flex items-center gap-1 text-xs font-serif-body text-[#6F583D] hover:text-[#8E2D20] underline underline-offset-4 decoration-[#C8B490] transition-colors whitespace-nowrap shrink-0"
            >
              <span>跳过手谕</span>
              <SkipForward className="w-3 h-3" />
            </button>
          </div>

          {/* Page Content */}
          {pageIdx === 0 && (
            <div className="my-auto py-5 space-y-5 text-center">
              <div className="flex flex-col items-center gap-2">
                <CrimsonWaxSealMedallion glyph="梦" className="w-14 h-14 drop-shadow-sm" />
                <p className="text-[11px] font-serif-body tracking-widest text-[#7E3726]">
                  第 Ⅰ 笺 · 守梦人任命状
                </p>
                <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#231A12] text-balance">
                  欢迎履新，晨露图书馆的「守梦人」
                </h1>
              </div>

              <div className="mx-auto max-w-lg rounded-[2px] border border-[#CDB892] bg-[#FCF7EA]/75 px-5 py-4 text-left space-y-2.5 font-serif-body text-sm text-[#352A20] leading-[1.85]">
                <p>
                  每当四季交替，总有四位被往事与诅咒困住的梦旅人，循着门铃声推开这座图书馆的木门。
                </p>
                <p>
                  作为静坐于橡木书桌之后的<strong className="font-semibold text-[#8A2E20]">「守梦人」</strong>，你的职责并非审讯，而是以温暖与细心替他们寻回遗失的《梦境之书》，拾取散落的记忆信物，并在入梦塔罗牌阵中帮他们解开心结。
                </p>
              </div>
            </div>
          )}

          {pageIdx === 1 && (
            <div className="my-auto py-4 space-y-4">
              <div className="text-center space-y-1">
                <p className="text-[11px] font-serif-body tracking-widest text-[#7E3726]">
                  第 Ⅱ 笺 · 案头三件秘器
                </p>
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#231A12]">
                  善用桌角器物，指引寻书与破咒
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="rounded-[2px] border border-[#C3AC84] bg-[#FCF7EA]/80 p-3.5 flex flex-col items-center text-center space-y-2">
                  <DeskLampArt isOn className="w-11 h-11" />
                  <h3 className="font-display text-sm font-semibold text-[#241B14]">
                    映墨暖灯
                  </h3>
                  <p className="text-xs font-serif-body text-[#4F4335] leading-relaxed">
                    点亮暖灯后，前往「四季书架」时目标馆区会亮起「✦」微光为你指路。
                  </p>
                </div>

                <div className="rounded-[2px] border border-[#C3AC84] bg-[#FCF7EA]/80 p-3.5 flex flex-col items-center text-center space-y-2">
                  <DeskTeacupArt className="w-11 h-11" />
                  <h3 className="font-display text-sm font-semibold text-[#241B14]">
                    洋甘菊热茶
                  </h3>
                  <p className="text-xs font-serif-body text-[#4F4335] leading-relaxed">
                    请访客入座后奉上一杯花茶，对方放松后会透露关键的破咒秘语线索。
                  </p>
                </div>

                <div className="rounded-[2px] border border-[#C3AC84] bg-[#FCF7EA]/80 p-3.5 flex flex-col items-center text-center space-y-2">
                  <DeskMagnifierArt active className="w-11 h-11" />
                  <h3 className="font-display text-sm font-semibold text-[#241B14]">
                    黄铜放大镜
                  </h3>
                  <p className="text-xs font-serif-body text-[#4F4335] leading-relaxed">
                    持镜可照出书架暗格的细小文字，以及《梦境书》第 3 页隐藏的淡墨信物。
                  </p>
                </div>
              </div>
            </div>
          )}

          {pageIdx === 2 && (
            <div className="my-auto py-4 space-y-4">
              <div className="text-center space-y-1">
                <p className="text-[11px] font-serif-body tracking-widest text-[#7E3726]">
                  第 Ⅲ 笺 · 守梦四步仪轨
                </p>
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#231A12]">
                  从收集信物到塔罗牌桌落印
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="rounded-[2px] border border-[#C7B189] bg-[#FCF7EA]/82 px-3.5 py-2.5 space-y-0.5">
                  <p className="font-display text-xs font-semibold text-[#8A2E20]">
                    Ⅰ · 门扉迎客并奉茶
                  </p>
                  <p className="text-xs font-serif-body text-[#4B3F32] leading-relaxed">
                    轻触门前驻足的梦旅人请其入座，听对方诉说心结并记下梦境书脊颜色。
                  </p>
                </div>

                <div className="rounded-[2px] border border-[#C7B189] bg-[#FCF7EA]/82 px-3.5 py-2.5 space-y-0.5">
                  <p className="font-display text-xs font-semibold text-[#8A2E20]">
                    Ⅱ · 四季书架寻书
                  </p>
                  <p className="text-xs font-serif-body text-[#4B3F32] leading-relaxed">
                    前往东西两侧藏书阁，对应春、夏、秋、冬四季馆区找回专属《梦境之书》。
                  </p>
                </div>

                <div className="rounded-[2px] border border-[#C7B189] bg-[#FCF7EA]/82 px-3.5 py-2.5 space-y-0.5">
                  <p className="font-display text-xs font-semibold text-[#8A2E20]">
                    Ⅲ · 集齐 4 枚案头信物
                  </p>
                  <p className="text-xs font-serif-body text-[#4B3F32] leading-relaxed">
                    翻阅书页拾取 4 枚信物收进右下角「案头信物卡」，它们是入梦破咒的推理凭证。
                  </p>
                </div>

                <div className="rounded-[2px] border border-[#C7B189] bg-[#FCF7EA]/82 px-3.5 py-2.5 space-y-0.5">
                  <p className="font-display text-xs font-semibold text-[#8A2E20]">
                    Ⅳ · 牌桌翻牌验真并落印
                  </p>
                  <p className="text-xs font-serif-body text-[#4B3F32] leading-relaxed">
                    展开 3:4 塔罗牌桌，翻面查看背面铭文并调整正逆位，解开梦结后收获临别回礼。
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer Pagination & Wax Seal CTA */}
          <div className="pt-3 border-t border-dashed border-[#C7B087] flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={pageIdx === 0}
              onClick={goPrev}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-serif-body font-medium text-[#3B2C1F] bg-[#EFE3C8] hover:bg-[#E4D3AE] disabled:opacity-40 disabled:pointer-events-none border border-[#9B825B] rounded-[2px] transition-colors whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>上一笺</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-display text-[#6D563B]">
              {PAGE_NUMERALS.map((num, idx) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    libraryAudio.playPageTurn();
                    setPageIdx(idx);
                  }}
                  aria-label={`查看第 ${idx + 1} 笺`}
                  className={`px-1.5 py-0.5 rounded-[2px] transition-colors ${
                    pageIdx === idx
                      ? 'font-semibold text-[#8E2D20] underline underline-offset-4'
                      : 'text-[#877156] hover:text-[#3B2C1F]'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            {pageIdx < 2 ? (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn rounded-[2px] transition-colors whitespace-nowrap shrink-0"
              >
                <span>翻看下一笺</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn rounded-[2px] transition-colors whitespace-nowrap shrink-0"
              >
                <Stamp className="w-3.5 h-3.5" />
                <span>钤印上岗 · 迎接首位访客</span>
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
